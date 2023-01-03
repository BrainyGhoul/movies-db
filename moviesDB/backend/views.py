# This file and app is just for backend and data handling
import itertools
import datetime
from django.http import JsonResponse
from rest_framework.views import APIView
from django.urls import get_resolver
from rest_framework import generics
from . import urls
from . import serializers
from . import models


# providing all the endpoints for the apis available
def endpoints(request):
    endpoints = []
    for app_resolver in get_resolver().url_patterns:
        if app_resolver.app_name == urls.app_name:
            endpoints = {pattern.name: app_resolver.pattern._route + pattern.pattern._route for pattern in app_resolver.url_patterns}
            break
    return JsonResponse(endpoints)

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



# HAVENT TESTED YET
# returning titles for different types of carouselss
class DisplayTitles(generics.ListCreateAPIView):

    model = models.Title
    serializer_class = serializers.TitleSerializer

    def get_queryset(self):
        
        queryset = models.Title.objects.all()
        # filter the titles
        for parameter, value in self.request.query_params.items():
            if value:
                try:
                    temp = queryset.filter(parameter=value)
                except:
                    continue
            queryset = temp
        
        # filtering for upcoming
        if self.request.query_params.get("upcoming"):
            queryset = queryset.filter(release_date__gt=datetime.date.today())
        
        return queryset


# # this class handles the login part
# class SignInUser(APIView):
#     serializer_class = serializers.SignInUserByUsername
    
#     # logging in the user
#     def post(self, request):
#         # figuring out whether email or username is being used to login
#         if "@" in request.data["username"]:
#             self.serializer_class = serializers.SignInUserByEmail
        
#         # validating data
#         serializer = self.serializer_class(data=request.POST)
#         print(serializer.is_valid())
#         if serializer.is_valid():

#             # logging in
#             username = serializer.data.get("username")
#             password = serializer.data.get("password")
#             user = authenticate(request, username=username, password=password)
#             # verifying authentication
#             if user is not None:
#                 login(request, user)
#                 return HttpResponseRedirect(reverse("home"))
#         print(serializer.data)
#         # if nothing validates, this message is sent
#         return JsonResponse({"message": "Invalid username or password"})
        
