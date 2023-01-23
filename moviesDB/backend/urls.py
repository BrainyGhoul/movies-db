from django.urls import path, include
from . import views
# from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = "backend"

# all the urls to the APIs and data are here
urlpatterns = [
    path('signin/', TokenObtainPairView.as_view(), name='signin'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("signup/", views.SignUpUser.as_view(), name="signup"),
    path("titles/", views.DisplayTitles.as_view(), name="titles"),
    path("watchlists/", views.getWatchlists.as_view(), name="watchlists"),
    # path("watchlists/", views.getWatchlists, name="watchlists"),
    path("endpoints/", views.endpoints, name="endpoints"),

]