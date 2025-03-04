from django.db import models
from datetime import datetime

class LegCache(models.Model):
    name_from = models.CharField(max_length=3)
    name_to = models.CharField(max_length=3)
    date_from = models.DateTimeField()
    date_to = models.DateTimeField()
    flight_no = models.CharField(max_length=10)
    airline_name = models.CharField(max_length=40)
    fetch_time = models.DateTimeField(default=datetime.now)

class SearchCache(models.Model):
    price = models.IntegerField()
    fare = models.CharField(max_length=10)
    fetch_time = models.DateTimeField(default=datetime.now)

    first_leg = models.ForeignKey(LegCache, on_delete=models.CASCADE, null=False, related_name='first_leg')
    second_leg = models.ForeignKey(LegCache, on_delete=models.CASCADE, null=True, related_name='second_leg')
    third_leg = models.ForeignKey(LegCache, on_delete=models.CASCADE, null=True, related_name='third_leg')
    fourth_leg = models.ForeignKey(LegCache, on_delete=models.CASCADE, null=True, related_name='forth_leg')



