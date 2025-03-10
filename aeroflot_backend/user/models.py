from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  tg_chat_id = models.BigIntegerField(null=True)
  is_subscriber = models.BooleanField(default=False)
  email_period = models.IntegerField(default=1)
