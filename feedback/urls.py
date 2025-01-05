from . import views
from django.urls import path

urlpatterns = [
    path('', views.Reviews.as_view(), name='feedback'),
    path('', views.feedback_detail, name='feedback'),
]