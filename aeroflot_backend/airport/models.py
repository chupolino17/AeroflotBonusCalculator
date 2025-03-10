from django.db import models

class City(models.Model):
    code = models.CharField(max_length=3)
    country = models.CharField(max_length=2)
    country_name = models.TextField()
    name = models.TextField()

    def __str__(self):
        return '{} ({})'.format(self.name, self.code)

class Airport(models.Model):
    code = models.CharField(max_length=3)
    name = models.TextField()
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="airport_city")

    def __str__(self):
        return '{} ({})'.format(self.name, self.code)
