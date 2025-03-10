from django.urls import path
from .views import get_user_info, get_login, logout_user, register, update_profile

urlpatterns = [
    path('user/', get_user_info),
    path('login', get_login),
    path('logout', logout_user),
    path('register', register),
    path('change', update_profile),
]
