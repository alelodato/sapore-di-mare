from . import views
from django.urls import path

urlpatterns = [
    path('', views.Homepage.as_view(), name='home'),
]