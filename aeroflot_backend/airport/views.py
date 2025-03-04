from django.http import JsonResponse, HttpResponse
from .models import Airport, City
from .external_requester import get_cities_from_aeroflot


def get_airports(request):
    records = list(Airport.objects.values())
    return JsonResponse(records, safe=False)

def update_airports(request):
    cities = get_cities_from_aeroflot()
    if cities is None:
        return HttpResponse(status=500)

    for city in cities:
        updated_city = City.objects.update_or_create(
            code=city['code'],
            country=city['country'],
            country_name=city['country_name'],
            name=city['name']
        )
        for airport in city["airports"]:
            Airport.objects.update_or_create(
                code=airport['code'],
                name=airport['name'],
                city=updated_city[0]
            )

    return get_airports(request)