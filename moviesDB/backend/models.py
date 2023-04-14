from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal
import datetime
from . import variables


class User(AbstractUser):
    is_celebrity = models.BooleanField(default=False)
    role = models.CharField(max_length=16, choices=variables.roles, default="0")
    profile_photo = models.ImageField(upload_to="profile_photo/", default="/profile_photo/default.png")
    cover_photo = models.ImageField(upload_to="cover_photo/", default="/cover_photo/default.png")
    bio = models.TextField(blank=True)

# tags associated with titles. for example thriller, action
class Tag(models.Model):
    name = models.CharField(max_length=16)

    def __str__(self):
        return self.name

# movies, tv shows and episodes are here
class Title(models.Model):
    title = models.CharField(max_length=255)
    cover = models.ImageField(upload_to="title_covers/", default="/title_covers/default.png")
    banner = models.ImageField(upload_to="title_banners/", default="/title_banners/default.jpeg", blank=True, null=True)
    description = models.TextField()
    release_date = models.DateField()
    region = models.CharField(max_length=64)
    language = models.CharField(max_length=32)
    titleType = models.CharField(max_length=16, choices=variables.titleTypes)
    length = models.DurationField()
    total_rating = models.DecimalField(decimal_places=1, max_digits=2, validators=[MinValueValidator(Decimal("0.0")), MaxValueValidator(Decimal("5.0"))], default=0.0)
    tags = models.ManyToManyField(Tag, related_name="title", blank=True)
    writers = models.ManyToManyField(User, related_name="titles_written")
    directors = models.ManyToManyField(User, related_name="titles_directed")
    stars = models.ManyToManyField(User, related_name="titles_starred")
    popular = models.BooleanField(default=False)
    

    def __str__(self):
        return self.title

# the reviews posted by users on movies
class Review(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="review")
    title = models.ForeignKey(Title, on_delete=models.CASCADE, related_name="review")
    review_title = models.TextField(max_length=variables.review_title_length)
    text = models.TextField()
    rating = models.IntegerField()
    likes = models.ManyToManyField(User, related_name="liked_review")
    posted_on = models.DateTimeField(default=datetime.datetime.now)

    def __str__(self):
        return self.author.username + ": " + self.title.title


class Rating(models.Model):
    title = models.ForeignKey(Title, related_name="rating", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="rating", on_delete=models.CASCADE)
    value = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])

    class Meta:
        unique_together = (('title', 'user'),)



# the watchlists created by users
class Watchlist(models.Model):
    name = models.CharField(max_length=variables.watchlist_name_length, unique=True)
    titles = models.ManyToManyField(Title, related_name="watchlist")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="watchlists")

    def __str__(self):
        return self.user.username
