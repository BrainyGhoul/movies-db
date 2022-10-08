# This file and app is just for backend and data handling

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
        serializer = self.serializer_class(data=request.POST)
        if serializer.is_valid():

            # making a new user
            username = serializer.data.get("username")
            password = serializer.data.get("password")
            email = serializer.data.get("email")
            first_name = serializer.data.get("first_name")
            last_name = serializer.data.get("last_name")
            is_staff = serializer.data.get("is_staff")
            is_celebrity = serializer.data.get("is_celebrity")
            role = serializer.data.get("role")

            # entertaining errors
            try:
                user = models.User(
                    username=username, 
                    password=password, 
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    is_staff=is_staff,
                    is_celebrity=is_celebrity,
                    role=role,
                )
                user.save()

            except IntegrityError:
                return JsonResponse({"message": "username has already been taken"})

            # logging in the new user
            login(request, user)
            return HttpResponseRedirect(reverse("home"))

        # if anything fails, the error message is provided
        return JsonResponse({"message": "The information provided is invalid"})




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
        
