from django.core import serializers
from django.http import HttpResponse

from .external_requester import get_miles_from_aeroflot
from .models import Miles

from pathlib import Path
import os
# X-IBM-Client-Id
CLIENT_TOKEN = Path(os.getenv('CLIENT_SECRET_FILE', '')).read_text()

def get_miles_results(code_from, code_to, client_token=CLIENT_TOKEN):

    cached_results = Miles.objects.all().filter(code_from=code_from, code_to=code_to)

    if len(cached_results):
        print('results for {}-{} from cache'.format(code_from, code_to))
        return cached_results

    aeroflot_response = get_miles_from_aeroflot(code_from, code_to, client_token)

    if aeroflot_response is None:
        return None

    for item in aeroflot_response:
        Miles.objects.update_or_create(
            code_from=item['code_from'],
            code_to=item['code_to'],
            is_economy=item['is_economy'],
            fare_name=item['fare_name'],
            fares_codes=item['fares_codes'],
            miles_price=item['miles_price']
        )[0]

    return Miles.objects.all().filter(code_from=code_from, code_to=code_to)


def get_miles_results_json(request):

    code_from = request.GET.get('code_from', 'SVO')
    code_to = request.GET.get('code_to', 'LED')
    client_token = request.GET.get('client_token', CLIENT_TOKEN)

    return HttpResponse(serializers.serialize('json', get_miles_results(code_from, code_to, client_token)), content_type='application/json')

