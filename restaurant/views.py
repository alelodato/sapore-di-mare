from django.shortcuts import render
from django.views import generic
from .models import Home 
# Create your views here.

class PostList(generic.ListView):
    model = Home