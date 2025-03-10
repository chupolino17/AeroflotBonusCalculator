from django.shortcuts import render
from django.forms.models import model_to_dict
from django.http import JsonResponse, HttpResponse

import datetime

from miles.views import get_miles_results

from .external_requester import get_flights_from_bgo
from .models import SearchCache
from .class_dict import *
from .serializer import SearchSerializer

def get_search_cache(request):
    records = list(SearchCache.objects.values())
    return JsonResponse(records, safe=False)

def get_miles_for_leg(code_from, code_to, bgo_fare_name):
    if bgo_fare_name not in BGO_FARES_DICT_TO_ID:
        return None
    fare_id = BGO_FARES_DICT_TO_ID[bgo_fare_name]
    all_fares = get_miles_results(code_from, code_to)
    for fare in all_fares:
        fare_dict = model_to_dict(fare)
        if fare_dict['fare_name'] not in AERFLOT_FARES_DICT_TO_ID:
            return None
        if AERFLOT_FARES_DICT_TO_ID[fare_dict['fare_name']] == fare_id:
            fare_dict.pop('fetch_time', None)
            return fare_dict
    return None

def serialize_legs_with_miles(legs, bgo_fare_name):
    legs_copy = []
    miles_price = 0
    for leg_from_json in legs:
        leg = leg_from_json.copy()
        leg['datetime_from'] = str(leg['datetime_from'])
        leg['datetime_to'] = str(leg['datetime_to'])
        leg['miles'] = get_miles_for_leg(leg['code_from'], leg['code_to'], bgo_fare_name)
        if leg['miles'] is not None:
            miles_price += int(leg['miles']['miles_price'])
        legs_copy.append(leg)
    return (legs_copy, miles_price)


def get_search_results(request):

    date_from = request.GET.get('datefrom', datetime.date.today().strftime('%d%m%Y'))
    ticket_class = request.GET.get('class', 'economy')
    code_from = request.GET.get('code_from', 'SVO')
    code_to = request.GET.get('code_to', 'LED')

    bgo_response = get_flights_from_bgo(ticket_class, date_from, code_from, code_to)

    if bgo_response is None:
        return HttpResponse(status=500)

    response = []

    for flight in bgo_response:

        json_legs, miles_sum = serialize_legs_with_miles(flight['legs'], flight['fare'])

        response.append(
            SearchCache.objects.update_or_create(
                legs=json_legs,
                price=flight["price"],
                fare=flight['fare'],
                datetime_from=flight['datetime_from'],
                datetime_to=flight['datetime_to'],
                name_from=flight['name_from'],
                name_to=flight['name_to'],
                miles_rate=1.0 * int(flight["price"]) / miles_sum if miles_sum else float('inf')
            )[0]
        )

    return JsonResponse(SearchSerializer(response, many=True).data, safe=False)

def get_top_searches(request):
    length = int(request.GET.get('length', 5))
    return JsonResponse(SearchSerializer(SearchCache.objects.all().exclude(miles_rate__isnull=True).order_by('miles_rate')[0:length], many=True).data, safe=False)