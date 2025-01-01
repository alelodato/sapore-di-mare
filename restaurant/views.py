from django.shortcuts import render
from django.views import generic
from .models import Home 
# Create your views here.

class Homepage(generic.ListView):
    queryset = Home.objects.all()
    template_name = "restaurant/index.html"