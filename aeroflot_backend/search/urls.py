from django.urls import path
from .views import get_search_results, get_top_searches

urlpatterns = [
    path('search/', get_search_results),
    path('top/', get_top_searches),
]
