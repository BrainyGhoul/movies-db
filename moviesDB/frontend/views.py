from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

# this is the view for pages and acts as an access point
def index(request, *args, **kwargs):
    return render(request, "frontend/index.html")