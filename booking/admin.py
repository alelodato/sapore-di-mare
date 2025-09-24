from django.contrib import admin
from django.urls import path, reverse
from django.shortcuts import render
from datetime import date, datetime, timedelta

from .models import Table, Reservation


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ("reservation_name", "reservation_date", "reservation_time", "number_of_guests", "reservation_email")
    list_filter = ("reservation_date", "reservation_time")
    search_fields = ("reservation_name", "reservation_email")


@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ("number", "seats", "x_position", "y_position")

    def changelist_view(self, request, extra_context=None):
        if extra_context is None:
            extra_context = {}
        extra_context['table_map_url'] = reverse('admin:table-map')
        return super().changelist_view(request, extra_context=extra_context)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path("map/", self.admin_site.admin_view(self.table_map_view), name="table-map"),
            path("table/<int:table_id>/<str:date>/", self.admin_site.admin_view(self.table_reservations_view), name="table-reservations"),
        ]
        return custom_urls + urls

    def table_map_view(self, request):
        date_str = request.GET.get("date")
        if date_str:
            try:
                selected_date = datetime.strptime(date_str, "%Y-%m-%d").date()
            except ValueError:
                selected_date = date.today()
        else:
            selected_date = date.today()
        
        prev_date = selected_date - timedelta(days=1)
        next_date = selected_date + timedelta(days=1)

        tables = Table.objects.all()

        reservations_by_table = {
            res.table_id: res
            for res in Reservation.objects.filter(
                reservation_date=selected_date
            )
        }

        reservations = (
            Reservation.objects.filter(reservation_date=selected_date,)
            .select_related("table")
            .order_by("table__number", "reservation_time")
        )

        return render(request, "admin/tablemap.html", {
            "tables": tables,
            "reservations": reservations,
            "selected_date": selected_date,
            "prev_date": prev_date,
            "next_date": next_date,
            "reservations_by_table": reservations_by_table,
        })

    def table_reservations_view(self, request, table_id, date):
        from datetime import datetime
        selected_date = datetime.strptime(date, "%Y-%m-%d").date()
        table = Table.objects.get(pk=table_id)
        reservations = Reservation.objects.filter(
            table=table,
            reservation_date=selected_date
        )

        return render(request, "admin/table_reservations.html", {
            "table": table,
            "reservations": reservations,
            "date": selected_date,
        })
