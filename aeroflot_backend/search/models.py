from django.db import models
from datetime import datetime
from miles.models import Miles

class SearchCache(models.Model):
    datetime_from = models.DateTimeField()
    datetime_to = models.DateTimeField()
    name_from = models.CharField(max_length=100)
    name_to = models.CharField(max_length=100)
    price = models.IntegerField()
    fare = models.CharField(max_length=100)
    legs = models.JSONField(encoder=None)
    fetch_time = models.DateTimeField(default=datetime.now)
    miles_rate = models.FloatField(0, null=True)
