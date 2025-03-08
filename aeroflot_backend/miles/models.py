from django.db import models
from datetime import datetime

class Miles(models.Model):
    code_from = models.CharField(max_length=3)
    code_to = models.CharField(max_length=3)
    is_economy = models.BooleanField()
    fare_name = models.CharField(max_length=50)
    fares_codes = models.JSONField()
    miles_price = models.IntegerField()
    fetch_time = models.DateTimeField(default=datetime.now)

