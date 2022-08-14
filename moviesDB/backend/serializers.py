from rest_framework import serializers
from . import models

# validating the incoming information
class RegisterUser(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = ("username", "password", "email", "first_name", "last_name", "is_staff", "is_celebrity", "role")


class LoginUserByEmail(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = ("email", "password")


class LoginUserByUsername(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = ("username", "password")