from django.shortcuts import render
from django.forms.models import model_to_dict
from .external_requester import get_flights_from_bgo
from .models import LegCache, SearchCache
from django.http import JsonResponse, HttpResponse
import datetime

def get_search_cache(request):
    records = list(SearchCache.objects.values())
    return JsonResponse(records, safe=False)

def update_or_create_leg(legs, leg_id):
    if leg_id >= len(legs):
        return None
    leg = legs[leg_id]
    return LegCache.objects.update_or_create(
        name_from = leg['name_from'],
        name_to = leg['name_to'],
        date_from = leg['datetime_from'],
        date_to = leg['datetime_to'],
        flight_no = leg['flight_no'],
        airline_name = leg['airline_name']
    )[0]

def get_search_results(request):

    date_from = request.GET.get('datefrom', datetime.date.today().strftime('%d%m%Y'))
    ticket_class = request.GET.get('class', 'economy')
    code_from = request.GET.get('code_from', 'SVO')
    code_to = request.GET.get('code_to', 'LED')

    print(date_from, ticket_class, code_from, code_to)

    bgo_response = get_flights_from_bgo(ticket_class, date_from, code_from, code_to)

    if bgo_response is None:
        return HttpResponse(status=500)

    response = []

    for flight in bgo_response:
        first_leg = update_or_create_leg(flight["legs"], 0)
        second_leg = update_or_create_leg(flight["legs"], 1)
        third_leg = update_or_create_leg(flight["legs"], 2)
        fourth_leg = update_or_create_leg(flight["legs"], 3)

        response.append(
            model_to_dict(
                SearchCache.objects.update_or_create(
                    first_leg=first_leg,
                    second_leg=second_leg,
                    third_leg=third_leg,
                    fourth_leg=fourth_leg,
                    price=flight["price"],
                    fare=flight['fare']
                )[0]
            )
        )

    return JsonResponse(response, safe=False)



