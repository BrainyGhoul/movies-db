from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ("id", "first_name", "last_name", "role", "username")

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
        fields = ("title", "cover", "description", "release_date", "region", "language", "titleType", "length", "rating", "tags", "writers", "directors", "stars", "banner")

class ReviewSerializer(serializers.ModelSerializer):
    author =  serializers.SlugRelatedField(read_only=True, slug_field="username")
    title = serializers.SlugRelatedField(read_only=True, slug_field="title")
    likes = serializers.SlugRelatedField(many=True, read_only=True, slug_field="username")
    class Meta:
        model = models.Review
        fields = ("author", "title", "review_title", "text", "rating", "likes", "posted_on")

class WatchlistSerializer(serializers.ModelSerializer):

    titles = TitleSerializer(read_only=True, many=True)

    class Meta:
        model = models.Watchlist
        fields = ("name", "titles")


class UserProfileSerializer(serializers.ModelSerializer):

    titles_written = TitleSerializer(read_only=True, many=True)
    titles_directed = TitleSerializer(read_only=True, many=True)
    titles_starred = TitleSerializer(read_only=True, many=True)
    review = ReviewSerializer(read_only=True, many=True)
    liked_review = ReviewSerializer(read_only=True, many=True)

    class Meta:
        model = models.User
        fields = ("titles_written", "titles_directed", "titles_starred", "review", "liked_review", "first_name", "last_name", "profile_photo", "role", "cover_photo", "is_celebrity", "bio")


# class SignInUserByEmail(serializers.ModelSerializer):

#     class Meta:
#         model = models.User
#         fields = ("email", "password")


# class SignInUserByUsername(serializers.ModelSerializer):

#     class Meta:
#         model = models.User
#         fields = ("username", "password")