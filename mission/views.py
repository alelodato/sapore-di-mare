from django.shortcuts import render
from django.views import generic
# Create your views here.

class Mission(generic.ListView):
    queryset = "mission.html"
    template_name = "mission/mission.html"