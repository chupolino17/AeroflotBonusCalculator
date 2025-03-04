from django.urls import path
from .views import get_search_results

urlpatterns = [
    path('search/', get_search_results),
]
