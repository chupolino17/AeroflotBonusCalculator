import requests
import json

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0'}
CITY_MAP = "https://www.aeroflot.ru/sb/booking/api/app/cities/v1?lang=ru"

def get_cities_from_aeroflot():
    request = requests.get(CITY_MAP, headers=headers)
    if request.ok:
        return json.loads(request.text)['data']['cities']
    return None
