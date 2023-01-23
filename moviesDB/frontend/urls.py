from django.urls import path
from . import views


app_name = "frontend"

# all the urls to the pages are here
urlpatterns = [
    path("", views.index, name="home"),
    path("signup", views.index, name="signup"),
    path("profile", views.index, name="profile"),
    path("title", views.index, name="title"),
    path("watchlists", views.index, name="watchlist"),
    path("signin", views.index, name="signin"),
]