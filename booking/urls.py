from . import views
from django.urls import path

urlpatterns = [
    path('', views.Bookings.as_view(), name='booking'),
    path('', views.booking_detail, name='booking_detail'),
 ]