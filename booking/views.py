from django.shortcuts import render
from django.views import generic
from datetime import datetime
from .models import Table
from django.contrib import messages
# Create your views here.

class Bookings(generic.ListView):
    queryset = Table.objects.all()
    template_name = "booking/booking.html"
        