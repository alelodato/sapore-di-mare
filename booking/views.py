from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, reverse, redirect
from django.template import loader
from django.core.exceptions import ValidationError
from django.views import generic
from django.contrib import messages
from .models import Reservation, User
from .forms import ReservationForm
from .utils import get_available_tables
from datetime import datetime
from django.contrib.auth.decorators import login_required


# Create your views here.

class ReservationList(generic.ListView):
    """
    Renders a list of existing reservations.
    """
    queryset = Reservation.objects.all()
    template_name = "reservations/reservation.html"


def check_time(date_choice, time_choice, timezone):
    "Function to check booked dates and times are in the future."
    booking_time = datetime.strptime(date_choice + ' ' + time_choice,
                                     '%Y-%m-%d %H:%M')
    if booking_time > datetime.now():
        return True
    else:
        return False


def add_reservation(request):
    """
    Renders reservation form to screen.
    """
    reservation_form = ReservationForm()
    if request.method == "POST":
        reservation_form = ReservationForm(data=request.POST)
        if reservation_form.is_valid():
            reservation = reservation_form.save(commit=False)
            date = reservation.reservation_date
            time = reservation.reservation_time
            datetime_choice_valid = check_time(str(date), time, datetime)
            if isinstance(reservation.reservation_time, str):
                reservation_time = datetime.strptime(reservation.reservation_time, "%H:%M").time()
            datetime_choice_valid = check_time(str(date), time, datetime)
            if datetime_choice_valid:
                """
                Adds user details to reservation.
                """
                reservation.reservation_booked_by = request.user
                reservation.reservation_email = request.user.email
                reservation.reservation_created_on = datetime.now()
                available_tables = get_available_tables(
                    reservation.reservation_date,
                    reservation.reservation_time,
                    reservation.number_of_guests
                    )
            if available_tables.exists():
                reservation.table = available_tables.first() #assign a table automatically from the available ones
                reservation.save()
                messages.add_message(request, messages.SUCCESS,
                                     'Your reservation was successfully made!')
                return HttpResponseRedirect(reverse('reservations'))
            else:
                messages.add_message(
                    request, messages.ERROR,
                    'No table available for this time slot, try changing number of covers or time.')

        else:
            messages.add_message(
                request, messages.error,
                'You entered a time in the past.\
                Please enter a later time.')

    return render(
        request,
        "reservations/make_reservation.html", {
            "reservation_form": reservation_form,
        }
    )


@login_required()
def delete_reservation(request, id):
    """
    Function to check user wants to delete reservation.
    """
    reservation = get_object_or_404(Reservation, id=id)
    if request.user != reservation.reservation_booked_by:
        messages.add_message(request, messages.ERROR,
                             "You can't access another user's reservation")
        return redirect('home')
    context = {
        'reservation': reservation,
    }

    return render(
        request,
        "reservations/delete_reservation.html",
        context
    )


def confirm_delete_reservation(request, id):
    """
    Function to delete reservation.
    Adapted from https://www.w3schools.com/django/django_delete_members.php
    """
    reservation = Reservation.objects.get(id=id)
    reservation.delete()
    messages.add_message(request, messages.SUCCESS,
                         'Your reservation has been deleted.')
    return HttpResponseRedirect(reverse('reservations'))

@login_required()
def edit_reservation(request, id):
    """
    Function to edit reservations.
    """
    reservation = get_object_or_404(Reservation, id=id)
    if request.user != reservation.reservation_booked_by:
            messages.add_message(request, messages.ERROR,
                                 "You can't access another user's reservation")
            return redirect('home')
    if request.method == "POST":
        reservation_form = ReservationForm(
            data=request.POST, instance=reservation)
        if reservation_form.is_valid():
            reservation = reservation_form.save(commit=False)
            """
            Check if date and time are in the future.
            """
            date = reservation.reservation_date
            time = reservation.reservation_time
            datetime_choice_valid = check_time(str(date), time, datetime)
            if datetime_choice_valid:
                reservation.reservation_booked_by = request.user
                reservation.reservation_email = request.user.email
                reservation.save()
                messages.add_message(request, messages.SUCCESS,
                                     'Your reservation has been updated!')
                return HttpResponseRedirect(reverse('reservations'))

            else:
                messages.add_message(request, messages.SUCCESS,
                                     'You entered a time in the past.\
                                     Please enter a later time.')
    else:
        reservation_form = ReservationForm(instance=reservation)

    context = {
        "reservation_form": reservation_form,
        'reservation': reservation,
    }

    return render(
        request,
        "reservations/make_reservation.html",
        context
    )


def table_reservations_view(request, table_id, date):
    from .models import Table
    try:
        selected_date = datetime.strptime(date, "%Y-%m-%d").date()
    except ValueError:
        selected_date = datetime.today().date()

    table = get_object_or_404(Table, id=table_id)

    reservations = Reservation.objects.filter(
        table=table,
        reservation_date=selected_date
    ).order_by("reservation_time")

    return render(request, "admin/table_reservations.html", {
        "table": table,
        "selected_date": selected_date,
        "reservations": reservations,
    })

