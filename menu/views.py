from django.shortcuts import render, get_object_or_404
from django.views import generic
from .models import Menu
# Create your views here.

class MenuList(generic.ListView):
    queryset = Menu.objects.all()
    template_name = "menu/menu.html"
    paginate_by = 2

def menu_detail(request, slug):
    """
    Display an individual :model:`menu.Menu`.
    """

    queryset = Menu.objects.all()
    menu = get_object_or_404(queryset, slug=slug)

    return render(
        request,
        "menu/menu_detail.html",
        {"menu": menu},
    )