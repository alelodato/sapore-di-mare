from django.test import TestCase
from datetime import date
from django.contrib.auth.models import User
from booking.models import Table, Reservation
from booking.utils import get_available_tables


class ReservationModelTest(TestCase):
    def setUp(self):
        self.table = Table.objects.create(
            number=1,
            seats=4,
            x_position=50,
            y_position=50
        )

    def test_create_reservation(self):
        reservation = Reservation.objects.create(
            reservation_name="Test User",
            number_of_guests=4,
            reservation_date=date.today(),
            reservation_time="19:00",   # 👈 stringa invece di time()
            table=self.table
        )
        self.assertEqual(reservation.reservation_name, "Test User")
        self.assertEqual(reservation.table, self.table)


class UtilsTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="12345")

        self.table1 = Table.objects.create(
            number=1, seats=4, x_position=50, y_position=50
        )
        self.table2 = Table.objects.create(
            number=2, seats=4, x_position=150, y_position=50
        )

    def test_available_table_when_free(self):
        available = get_available_tables(date.today(), "19:00", 4)  # 👈 stringa
        self.assertIn(self.table1, available)
        self.assertIn(self.table2, available)

    def test_unavailable_when_reserved(self):
        Reservation.objects.create(
            reservation_name="Already Booked",
            number_of_guests=4,
            reservation_date=date.today(),
            reservation_time="19:00",   # 👈 stringa
            table=self.table1,
            reservation_booked_by=self.user
        )
        available = get_available_tables(date.today(), "19:00", 4)  # 👈 stringa
        self.assertNotIn(self.table1, available)
        self.assertIn(self.table2, available)
