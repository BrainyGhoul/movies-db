from django.urls import path
from . import views


# all the urls to the APIs and data are here
urlpatterns = [
    path("user-info", views.user_info, name="user_info"),
    path("register", views.RegisterUser.as_view(), name="register"),
    path("login", views.LoginUser.as_view(), name="login")
]