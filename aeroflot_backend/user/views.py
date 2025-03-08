from rest_framework.request import Request
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication
from .serializer import UserSerializer

@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([BasicAuthentication])
def UserView(request):
    return JsonResponse(UserSerializer(request.user).data)