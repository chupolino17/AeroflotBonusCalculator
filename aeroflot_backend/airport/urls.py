from django.urls import path
from .views import get_airports, update_airports

urlpatterns = [
    path('get_airports/', get_airports),
    path('update_airports/', update_airports),
]
