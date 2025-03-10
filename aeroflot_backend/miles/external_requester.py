import requests
import json
import hashlib
import datetime
import hashlib

MILES_SEARCH_LINK = 'https://gw.aeroflot.ru/api/pr/milesCalc/v1/calcChargedMiles'
HEADERS_TEMPLATE = {
    'Content-Type': 'application/json',
    'Sec-Fetch-Dest': 'empty',
    'Accept': 'application/json',
    'Sec-Fetch-Site': 'same-site',
    'Accept-Language': 'ru',
    'Accept-Encoding': 'json',
    'Sec-Fetch-Mode': 'cors',
    'Origin': 'https://www.aeroflot.ru',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1.1 Safari/605.1.15',
    'Referer': 'https://www.aeroflot.ru/'
}
PAYLOPAD_QUERY_TEMPLATE = '{"airline":{"airlineCode":"SU"},"origin":{"airport":{"airportCode":"AIRPORT_FROM"}},"destination":{"airport":{"airportCode":"AIRPORT_TO"}},"tierLevel":{"tierLevelCode":"basic"},"isRoundTrip":false,"lang":"ru"}'

def get_miles_payload(code_from, code_to):

    payload_query = PAYLOPAD_QUERY_TEMPLATE
    payload_query = payload_query.replace('AIRPORT_FROM', code_from)
    payload_query = payload_query.replace('AIRPORT_TO', code_to)

    payload = json.loads(payload_query)

    return payload

def get_miles_from_aeroflot(code_from, code_to, client_token):
    headers = HEADERS_TEMPLATE.copy()
    headers['X-IBM-Client-Id'] = client_token
    request = requests.post(MILES_SEARCH_LINK, headers=headers, json=get_miles_payload(code_from, code_to))

    print('results for {}-{} from aeroflot'.format(code_from, code_to))

    if request.ok:
        miles = []
        search_result = json.loads(request.text)['route'][0]['segments'][0]['milesAmount']

        for fare_classes in search_result:
            fare_class_name = fare_classes['classOfService']['classOfServiceCode']
            for fare_group in fare_classes['fareGroups']:
                fare_name = fare_group['fareGroup']['fareGroupCode']
                for fare_subgroup in fare_group['airlineFareGroups']:
                    fare_prefixes = fare_subgroup['farePrefixes']
                    miles_price = fare_subgroup['milesQualifying']
                    miles.append({
                        'code_from': code_from,
                        'code_to': code_to,
                        'is_economy': fare_class_name == 'economy',
                        'fare_name': fare_name,
                        'fares_codes': fare_prefixes,
                        'miles_price': miles_price
                    })

        return miles
    return None
