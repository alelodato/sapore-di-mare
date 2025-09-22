from datetime import datetime, timedelta


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

    