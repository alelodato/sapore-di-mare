from django.core.exceptions import ValidationError
from datetime import datetime, timedelta
from .models import Table, Reservation

def assign_table(Reservation):
    guests = reservation.number_of_guests
    date = reservation.reservation_date
    time = reservation.reservation_time

    min_seats = guests
    max_seats = guests + 2

    candidate_tables = Table.objects.filter(seats__gte=min_seats, seats__lte=max_seats)
    if not candidate_tables.exists():
        raise ValidationError(f"No suitable tables for {guests} guests.")
    
    start_dt = datetime.combine(date, time )
    end_dt = start_dt + timedelta(hours=2)

    reserved_tables = Reservation.objects.filter(
        reservation_date=date,
        reservation_time__lt=end_dt.time(),
        reservation_time__gte=start_dt.time(),
    ).values_list("table_id", flat=True)

    free_tables = candidate_tables.exclude(id__in=reserved_tables)

    if not free_tables.exists():
        raise ValidationError("All suitable tables are already booked for this time slot.")
    
    assigned_table = free_tables.order_by("seats").first()
    reservation.table = assign_table
    return reservation


def get_available_tables(date, time, guests):
    from .models import Table, Reservation
    """
    Returns all available tables for a specific date/time/guests,
    considering a booking time of 2 hours
    """
    booking_start = datetime.combine(date,time)
    booking_end = booking_start + timedelta(hours=2)
    """
    Avoid table bookings overlapping
    """
    overlapping = Reservation.objects.filter(
        date=date,
        time__lt=booking_end.time(),
        time__gte=(booking_start - timedelta(hours=2)).time()
        ).values_list("table_id", flat=True)
    
    return Table.objects.exclude(id__in=overlapping).filter(seats__gte=guests)
