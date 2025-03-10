from rest_framework.serializers import Serializer, ModelSerializer, CharField
from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'date_joined', 'is_subscriber', 'email_period']


class LoginRequestSerializer(Serializer):
    model = User

    username = CharField(required=True)
    password = CharField(required=True)
