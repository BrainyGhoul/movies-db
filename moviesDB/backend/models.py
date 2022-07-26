from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser
from . import variables


class User(AbstractUser):
    is_celebrity = models.BooleanField(default=False)
    role = models.CharField(max_length=16, choices=variables.roles, default="0")

# tags associated with titles. for example thriller, action
class Tag(models.Model):
    name = models.CharField(max_length=16)

# movies, tv shows and episodes are here
class Title(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    release_date = models.DateField()
    region = models.CharField(max_length=64)
    language = models.CharField(max_length=32)
    titleType = models.CharField(max_length=16, choices=variables.titleTypes)
    length = models.DurationField()
    rating = models.IntegerField()
    tags = models.ManyToManyField(Tag, related_name="title")
    writers = models.ManyToManyField(User, related_name="titles_written")
    directors = models.ManyToManyField(User, related_name="titles_directed")
    stars = models.ManyToManyField(User, related_name="title_starred")

# the reviews posted by users on movies
class Review(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="review")
    movie = models.ForeignKey(Title, on_delete=models.CASCADE, related_name="review")
    title = models.TextField(max_length=variables.review_title_length)
    text = models.TextField()
    rating = models.IntegerField()
    likes = models.ManyToManyField(User, related_name="liked_review")

# the watchlists created by users
class Watchlist(models.Model):
    name = models.CharField(max_length=variables.watchlist_name_length)
    title = models.ManyToManyField(Title, related_name="watchlist")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="watchlist")
