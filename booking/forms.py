
from .models import Reservation
from django import forms
from django.forms import DateInput
from datetime import datetime

date_time_now = datetime.now()


class DateInput(forms.DateInput):
    """
    This class was taken from
    "https://stackoverflow.com/questions/3367091/whats-the-cleanest-simplest-to-get-running-datepick
    -in-django"
    """
    input_type = 'date'


class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ('reservation_name',
                  'reservation_date',
                  'reservation_time',
                  'number_of_guests',)
        widgets = {
            "reservation_date": DateInput(
                attrs={'min': date_time_now.strftime('%Y-%m-%d')}),
        }
