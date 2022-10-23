# This file and app is just for backend and data handling
import itertools
from xml.dom.expatbuilder import InternalSubsetExtractor
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from rest_framework.response import Response
from django.urls import get_resolver
from . import urls
import json
from . import serializers
from . import models
from . import variables


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
    serializer_class = serializers.SignUpUser

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
        
