from rest_framework import serializers
from .models import Miles

class MilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Miles
        fields = ['code_from', 'code_to', 'is_economy', 'fare_name', 'fares_codes', 'miles_price']
