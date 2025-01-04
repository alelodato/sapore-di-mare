from django.shortcuts import render
from django.views import generic
# from .models import Table
# Create your views here.
class Bookings(generic.ListView):
    queryset = "booking.html"
    template_name = "booking/booking.html"
#class Bookings(generic.ListView):
#    queryset = Table.objects.all()
#    template_name = "booking/booking.html"

# def booking_detail(request):

#    queryset = Review.objects.all()
#    booking = get_object_or_404(queryset,)

#    return render(
#        request,
#        "booking/booking.html",
#        {"booking_system": booking_system},
#    )