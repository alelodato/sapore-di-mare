from . import views
from django.urls import path
from mission.views import Mission

urlpatterns = [
    path('', views.Mission.as_view(), name='mission'),
]