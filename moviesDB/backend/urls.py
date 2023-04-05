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
    path("watchlists/<str:action>", views.getWatchlists.as_view(), name="watchlists"),
    path("profile/<str:username>", views.getProfile.as_view(), name="profile"),
    path("title/<int:id>", views.getTitle.as_view(), name="title"),
    path("endpoints/", views.endpoints, name="endpoints"),
    # path("add_to_watchlist/<int:id>", views.add_to_watchlist.as_view(), name="add_to_watchlist")
]