from django.shortcuts import render
from django.views import generic
from .models import Table
# Create your views here.

class Bookings(generic.ListView):
    queryset = Table.objects.all()
    template_name = "booking/booking.html"

def booking_detail(request):

    booking = Table.objects.all()
    booking = get_object_or_404(queryset,)

    return render(
        request,
        "booking/booking.html",
        {"booking": booking },
    )