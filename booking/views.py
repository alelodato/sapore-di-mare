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
    if request.method == "POST":
        booking = Table(data=request.POST)
        if booking.is_valid():
            table = booking.save(commit=False)
            table.customer = request.user
            table.save()

    return render(
        request,
        "booking/booking.html",
        {"booking": booking },
    )