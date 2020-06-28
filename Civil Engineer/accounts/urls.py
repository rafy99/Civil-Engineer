from django.urls import path
from .views import *

app_name="accounts"
# or  namespace='blog') inside the url to that file


urlpatterns = [
    path("login/",login_view,name="login"),
    path("logout/",logout_view,name="logout"),
]
