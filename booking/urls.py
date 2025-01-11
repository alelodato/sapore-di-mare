from . import views
from django.urls import path

urlpatterns = [
    path('', views.Bookings.as_view(), name='bookings'),
    path('add/', views.add_reservation, name='add-reservation'),
 ]