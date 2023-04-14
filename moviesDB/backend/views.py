# This file and app is just for backend and data handling
import itertools
import datetime
from django.http import JsonResponse
from rest_framework.views import APIView
from django.urls import get_resolver
from django.contrib.auth.decorators import login_required
from rest_framework import generics
from django.core.paginator import Paginator
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django.db.models import Sum
from . import urls
from . import serializers
from . import models
from . import variables
import json

# providing all the endpoints for the apis available
def endpoints(request):
    endpoints = []
    for app_resolver in get_resolver().url_patterns:
        if app_resolver.app_name == urls.app_name:
            endpoints = {pattern.name: app_resolver.pattern._route + pattern.pattern._route for pattern in app_resolver.url_patterns}
            break
    return JsonResponse(endpoints)


# # adds or removes movie from watchlists
# @login_required
# def add_to_watchlist(request):


# registering users
class SignUpUser(APIView):
    serializer_class = serializers.SignUpUserSerializer

    # when the user submits registration form
    def post(self, request, format=None):

        # validating the data
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():

            # making a new user
            username = serializer.data.get("username")
            password = serializer.data.get("password")
            email = serializer.data.get("email")
            first_name = serializer.data.get("first_name")
            last_name = serializer.data.get("last_name")

            user = models.User.objects.create_user(
                username=username, 
                password=password, 
                email=email,
                first_name=first_name,
                last_name=last_name
            )
            user.save()


            return JsonResponse({"message": "You have successfully created an account"})
        
        errors = list(itertools.chain(*[[i.title() for i in v][:] for k, v in serializer.errors.items()]))
        
        # if anything fails, the error message is provided
        return JsonResponse({"Error": errors})



# returning titles for different types of carousels
class DisplayTitles(generics.ListCreateAPIView):

    model = models.Title
    serializer_class = serializers.TitleSerializer

    def get_queryset(self):
        queryset = models.Title.objects.all().order_by("-id")
        page = 1

        # filter the titles based on string query parameters
        for parameter, value in self.request.query_params.items():
            if not value:
                continue

            if parameter == "page":
                page = int(value)
                continue

            try:
                # if the field is a relation, the identifying field of the related model is used to filter the queryset
                if models.Title._meta.get_field(parameter).is_relation:
                    field_model = models.Title._meta.get_field(parameter).related_model
                    if field_model == models.User:
                        parameter = parameter + "__username"
                    elif field_model == models.Tag:
                        parameter = parameter + "__name"


                value = json.loads(value) if value == "false" or value == "true" else value
                if isinstance(value, str):
                    parameter = parameter + "__iexact"
                    value = value.lower()

                queryset = queryset.filter(**{parameter: value})

            except:
                continue
        
        # filtering for upcoming
        if self.request.query_params.get("upcoming"):
            queryset = queryset.filter(release_date__gt=datetime.date.today())
        # creating pages
        queryset = Paginator (queryset, variables.titles_per_page).get_page(page)
        return queryset


class getWatchlists(APIView):
    model = models.Watchlist
    serializer_class = serializers.WatchlistSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, *args, **kwargs):

        if kwargs["action"] == "add":
            
            watchlist_name = self.request.data.get("watchlist")
            title_id = self.request.data.get("title_id")
            title = models.Title.objects.get(id=title_id)
            if not watchlist_name and title_id:
                return JsonResponse({"error": "The data is not available"})
            
            try:
                watchlist = models.Watchlist.objects.get(name=watchlist_name)
            except:
                watchlist = models.Watchlist.objects.create(name=watchlist_name, user=self.request.user)
            # breakpoint()
            if title in watchlist.titles.all():
                watchlist.titles.remove(title.id)
            else:
                watchlist.titles.add(title.id)

            watchlist.save()
            return JsonResponse({"message": "success"})
        else:
            pass

    def get(self, *args, **kwargs):

        if kwargs["action"] == "get":
            queryset = self.request.user.watchlists.all().order_by("id")
            return JsonResponse(self.serializer_class(queryset, many=True).data, safe=False)
    
class getProfile(generics.ListAPIView):
    model = models.User
    serializer_class = serializers.UserProfileSerializer

    def get_queryset(self):

        username = self.kwargs.get("username")
        if username == "me" and self.request.user.is_authenticated:
            object = models.User.objects.filter(id=self.request.user.id)
        else:
            try:
                object = models.User.objects.filter(username=username)
            except:
                return JsonResponse({"message": "invalid username"})
            
        return object

class getTitle(generics.ListAPIView):
    model = models.Title
    serializer_class = serializers.TitleSerializer

    def get_queryset(self):

        try:
            id = self.kwargs.get("id")
            object = models.Title.objects.filter(id=id)
            return object
        except:
            return JsonResponse({"message": "invalid title"})

@login_required
@api_view(['GET', 'POST'])
def TitleRating(request, title_id):

    try:
        title = models.Title.objects.get(id=title_id)
    except:
        return JsonResponse({"error": "invalid title id"})
    try:
        rating = title.rating.get(user=request.user)
    except:
        rating = None

    if request.method == "GET":
        if rating:
            rating = rating.value
        return JsonResponse({"message": "success", "rating": rating})

    
    elif request.method == "POST":
        value = request.data.get("rating")

        if rating:
            rating_serialized = serializers.RatingSerializer(rating, data={"user":request.user.id, "value": value, "title":title.id})
        else:
            rating_serialized = serializers.RatingSerializer(data={"user":request.user.id, "value":value, "title":title.id})

        if not rating_serialized.is_valid():
            print("inbalid")
            print(rating_serialized.errors)
            return JsonResponse({"error": "rating value invalid"})

        print("abhi tak to sab thik hai")
        rating_serialized.save(value=value)

        all_ratings = title.rating.only("value")
        
        title.total_rating = all_ratings.aggregate(Sum("value"))["value__sum"] / all_ratings.count()
        title.save()

        return JsonResponse({"message": "rating was updated or created successfully"})
        