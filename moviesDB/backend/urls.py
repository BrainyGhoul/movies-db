from django.urls import path
from . import views


urlpatterns = [
    # react components
    path("", views.index),
    path("profile", views.index),
    path("title", views.index),
    path("watchlist", views.index),
    path("register", views.index)

    # APIs
]