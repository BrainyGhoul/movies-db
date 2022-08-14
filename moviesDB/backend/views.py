from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework import response
import json
from . import serializers
from . import models


# this is the main view
def index(request, *args, **kwargs):

    # redirecting logged out users to login page
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))

    return render(request, "frontend/index.html")



# registering users
class RegisterUser(APIView):
    serializer_class = serializers.RegisterUser

    # when the user load the register page
    def get(self, request):

        # redirecting the registered users to home since they are already registered
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse("home"))

        return render(request, "frontend/index.html")

    # when the user submits registration form
    def post(self, request):

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





# this class handles the login part
class LoginUser(APIView):
    serializer_class = serializers.LoginUserByUsername

    # loading the login page
    def get(self, request):

        # redirecting the registered users to home since they are already registered
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse("home"))
        render(request, "frontend/index.html")
    
    # logging in the user
    def post(self, request):
        # figuring out whether email or username is being used to login
        data = json.loads(request.body)
        if "@" in data["username"]:
            self.serializer_class = serializers.LoginUserByEmail
        
        # validating data
        serializer = self.serializer_class(data=request.POST)
        if serializer.is_valid():

            # logging in
            username = serializer.data.get("username")
            password = serializer.data.get("password")

            user = authenticate(request, username=username, password=password)

            # verifying authentication
            if user is not None:
                login(request, user)
                return HttpResponseRedirect(reverse("home"))

        # if nothing validates, this message is sent
        return JsonResponse({"message": "Invalid username or password"})
        
