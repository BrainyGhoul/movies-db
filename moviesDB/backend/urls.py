from django.urls import path
from . import views


urlpatterns = [
    # react components
    path("", views.index, name="home"),
    path("register", views.index, name="register"),
    path("profile", views.index, name="profile"),
    path("title", views.index, name="title"),
    path("watchlist", views.index, name="watchlist"),
    path("login", views.index, name="login"),

]