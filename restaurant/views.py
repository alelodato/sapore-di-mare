from django.shortcuts import render
from django.views import generic
# Create your views here.

class Homepage(generic.ListView):
    queryset = "index.html"
    template_name = "restaurant/index.html"