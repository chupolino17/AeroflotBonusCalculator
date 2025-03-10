from django.urls import path
from .views import get_miles_results_json

urlpatterns = [
    path('miles/', get_miles_results_json),
]
