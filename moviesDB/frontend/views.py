from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

# this is the view for pages and acts as an access point
def index(request, *args, **kwargs):
    path = request.path_info
    # a logged in user cannot access the login or register page
    if request.user.is_authenticated:
        if path == "/register" or path == "/login":
            return HttpResponseRedirect(reverse("frontend:home"))

    # if a user is not logged in, he can't access any page other than the login or register page
    elif not(path == "/register" or path == "/login"):
        return HttpResponseRedirect(reverse("frontend:login"))

    # in all the conditions other than the ones described above, the user is allowed to access the page
    return render(request, "frontend/index.html")