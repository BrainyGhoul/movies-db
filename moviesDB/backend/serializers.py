from rest_framework import serializers
from . import models

# validating the incoming information
class SignUpUser(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = ("username", "password", "email", "first_name", "last_name", "is_staff", "is_celebrity", "role")


class SignInUserByEmail(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = ("email", "password")


class SignInUserByUsername(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = ("username", "password")