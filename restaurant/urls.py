from . import views
from django.urls import path
from restaurant.views import Homepage

urlpatterns = [
    path('', views.Homepage.as_view(), name='home'),
]