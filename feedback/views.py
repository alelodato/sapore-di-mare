from django.shortcuts import render
from django.views import generic
from .models import Review
# Create your views here.

class Reviews(generic.ListView):
    queryset = Review.objects.all()
    template_name = "feedback/feedback.html"