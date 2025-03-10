
from django.http import JsonResponse

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication

from django.contrib.auth import authenticate, login, logout

from .serializer import UserSerializer, LoginRequestSerializer
from .models import User

@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def get_user_info(request):
    return JsonResponse(UserSerializer(request.user).data)

@api_view(['POST'])
@permission_classes([AllowAny])
def get_login(request: Request):
    serializer = LoginRequestSerializer(data=request.data)
    if serializer.is_valid():
        print('CRED VALID')
        authenticated_user = authenticate(**serializer.validated_data)
        if authenticated_user is not None:
            login(request, authenticated_user)
            return JsonResponse(UserSerializer(request.user).data)
        else:
            return Response({'error': 'Invalid credentials'}, status=403)
    else:
        return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def logout_user(request):
    logout(request)
    return Response(status=200)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        User.objects.create_user(
            serialized.initial_data['email'],
            serialized.initial_data['username'],
            serialized.initial_data['password']
        )
        return Response(serialized.data, status=201)
    else:
        print(serialized)
        return Response(serialized._errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def update_profile(request):

    serializer = UserSerializer(request.user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=200)
    else:
        return Response(serializer._errors, status=400)

