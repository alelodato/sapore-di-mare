from datetime import datetime, timedelta
from django.core.exceptions import ValidationError
from .models import Table, Reservation


def assign_table(reservation):
    """
    Assigns a suitable table to a reservation based on number of guests, date and time.
    Applies the rule: table seats >= guests and <= guests + 2.
    """
    guests = reservation.number_of_guests
    date = reservation.reservation_date
    time = reservation.reservation_time

    # min and max seats allowed
    min_seats = guests
    max_seats = guests + 2

    # find candidate tables
    candidate_tables = Table.objects.filter(seats__gte=min_seats, seats__lte=max_seats)
    if not candidate_tables.exists():
        raise ValidationError(f"No suitable tables for {guests} guests")

    # booking start and end
    start_dt = datetime.combine(date, time)
    end_dt = start_dt + timedelta(hours=2)

    # find reserved tables overlapping in the same slot
    reserved_tables = Reservation.objects.filter(
        reservation_date=date,
        reservation_time__lt=end_dt.time(),
        reservation_time__gte=start_dt.time()
    ).values_list("table_id", flat=True)

    # free tables
    free_tables = candidate_tables.exclude(id__in=reserved_tables)

    if not free_tables.exists():
        raise ValidationError("All suitable tables are already booked for this time slot.")

    # assign the smallest available table
    assigned_table = free_tables.order_by("seats").first()
    reservation.table = assigned_table
    return reservation


def get_available_tables(date, time, guests):
    """
    Returns all available tables for a specific date/time/guests,
    considering a booking time of 2 hours.
    """
    if isinstance(time, str):
        time = datetime.strptime(time, "%H:%M").time()

    booking_start = datetime.combine(date, time)
    booking_end = booking_start + timedelta(hours=2)

    reserved_tables = []
    for r in Reservation.objects.filter(reservation_date=date):
        res_time = r.reservation_time
        if isinstance(res_time, str):
            res_time = datetime.strptime(res_time, "%H:%M").time()
        existing_start = datetime.combine(r.reservation_date, res_time)
        existing_end = existing_start + timedelta(hours=2)
        
        if booking_start < existing_end and booking_end > existing_start:
            reserved_tables.append(r.table_id)

    min_seats = int(guests)
    max_seats = min_seats + 2

    return Table.objects.filter(
        seats__gte=min_seats,
        seats__lte=max_seats
    ).exclude(id__in=reserved_tables)
