from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ("first_name", "last_name", "role")

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tag
        fields = ("name",)

# validating the incoming information
class SignUpUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = ("username", "password", "email", "first_name", "last_name")



class TitleSerializer(serializers.ModelSerializer):
    tags = TagSerializer(read_only=True, many=True)
    writers = UserSerializer(read_only=True, many=True)
    directors = UserSerializer(read_only=True, many=True)
    stars = UserSerializer(read_only=True, many=True)

    class Meta:
        model = models.Title
        fields = ("title", "cover", "description", "release_date", "region", "language", "titleType", "length", "rating", "tags", "writers", "directors", "stars")


# class SignInUserByEmail(serializers.ModelSerializer):

#     class Meta:
#         model = models.User
#         fields = ("email", "password")


# class SignInUserByUsername(serializers.ModelSerializer):

#     class Meta:
#         model = models.User
#         fields = ("username", "password")