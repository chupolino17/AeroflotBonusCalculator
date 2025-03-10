import requests
import json
import hashlib
import datetime

BGO_SEARCH_LINK = 'https://www.bgoperator.ru/site?action=biletgraphql&task=biletjson/'
HEADERS = {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Sec-Fetch-Site': 'same-origin',
    'Accept-Language': 'ru',
    'Accept-Encoding': 'text',
    'Sec-Fetch-Mode': 'cors',
    'Origin': 'https://www.bgoperator.ru',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1.1 Safari/605.1.15',
    'Referer': 'https://www.bgoperator.ru/price.shtml?action=biletnew',
    'Content-Length': '380',
    'Connection': 'keep-alive',
    'Sec-Fetch-Dest': 'empty',
    'Priority': 'u=3, i'
}

PAYLOAD_TEMPLATE = "query Index {meta {...F0}} fragment F0 on Meta {__searchdata3qSbyh:_searchdata(searchflights:\"PAYLOAD_REQUEST_PATCH/MDA5_REQUEST_HASH\",adt:1,chd:0,inf:0,airline:\"\",direct:\"0\",rand:0) {id,airlines {id,n},locations {id,n},fares {id,h,p,bd,c,f},nodes {id,ac,acid,acn,ad,an,at,c,f,d,dc,dcid,dcn,dd,dn,dt,t,oa},routes {id,n},groups {id,n}}}"

def get_bgo_payload(ticket_class, date_from, destination_from, destination_to):
    original_str = "{}{}_{}_{}.".format(0 if ticket_class == "economy" else 1, date_from, destination_from, destination_to)
    substr = original_str[4:10]

    str_for_hash = original_str + substr

    payload_query = PAYLOAD_TEMPLATE
    payload_query = payload_query.replace('MDA5_REQUEST_HASH', hashlib.md5(str_for_hash.encode('utf-8')).hexdigest())
    payload_query = payload_query.replace('PAYLOAD_REQUEST_PATCH', original_str)

    payload = {
        "query": payload_query,
        "variables": {}
    }

    return payload

def get_flights_from_bgo(ticket_class, date_from, destination_from, destination_to):
    request = requests.post(BGO_SEARCH_LINK, headers=HEADERS, json=get_bgo_payload(ticket_class, date_from, destination_from, destination_to))

    if request.ok:
        response_json = json.loads(request.text)['data']['meta']
        search_result = response_json[list(response_json)[0]]
        nodes = {node["id"]: node for node in search_result["nodes"]}
        locations = {location["id"]: location for location in search_result["locations"]}
        airlines = {airline["id"]: airline for airline in search_result["airlines"]}

        legs = {}
        groups = {group["id"]: group for group in search_result["groups"]}

        legs_codes = {
                leg_codes.split('.')[0][2:]: {
                    "code_from": leg_codes.split('.')[2],
                    "code_to": leg_codes.split('.')[3]
                } for fare in search_result["fares"] for leg_codes in fare['h'].split('(')[1].split(')')[0].split('~')
            }

        for group in groups:
            for legs_group in groups[group]["n"][0]:
                for leg_id in legs_group:
                    leg_id = str(leg_id)
                    legs[leg_id] = {
                        "flight_no": nodes[leg_id]["oa"] + nodes[leg_id]["f"],
                        "datetime_from": datetime.datetime.strptime(nodes[leg_id]["dd"] + nodes[leg_id]["dt"], "%d.%m.%Y%H:%M"),
                        "datetime_to": datetime.datetime.strptime(nodes[leg_id]["ad"] + nodes[leg_id]["at"], "%d.%m.%Y%H:%M"),
                        "name_from": '{} ({})'.format(locations[nodes[leg_id]["dcn"]]['n'], locations[nodes[leg_id]["dn"]]['n']),
                        "name_to": '{} ({})'.format(locations[nodes[leg_id]["acn"]]['n'], locations[nodes[leg_id]["an"]]['n']),
                        "code_from": legs_codes[nodes[leg_id]["c"] + nodes[leg_id]["f"]]['code_from'],
                        "code_to": legs_codes[nodes[leg_id]["c"] + nodes[leg_id]["f"]]['code_to'],
                        "airline_name": airlines[nodes[leg_id]["oa"]]['n']
                    }

        flights = []
        fares = {fare["id"]: fare for fare in search_result["fares"]}
        routes = [route for route in search_result["routes"]]

        for route in routes:
            flight_legs = [legs[leg_id] for leg_id in route['id'].split(',')]

            datetime_from = min(flight_legs, key=lambda x:x['datetime_from'])['datetime_from']
            datetime_to = max(flight_legs, key=lambda x:x['datetime_to'])['datetime_to']
            code_from = min(flight_legs, key=lambda x:x['datetime_from'])['name_from']
            code_to = max(flight_legs, key=lambda x:x['datetime_to'])['name_to']

            for fare_id in route["n"]:
                flights.append({
                    "legs": flight_legs,
                    "fare": fares[fare_id]["bd"].split(":")[1][:-3],
                    "price": fares[fare_id]["p"],
                    "datetime_from": datetime_from,
                    "datetime_to": datetime_to,
                    "name_from": code_from,
                    "name_to": code_to
                })

        return flights
    return None
