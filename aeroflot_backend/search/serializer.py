from rest_framework import serializers
from .models import SearchCache
from miles.serializer import MilesSerializer

class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchCache
        fields = ['datetime_from', 'datetime_to', 'name_from', 'name_to', 'price', 'fare', 'legs']
