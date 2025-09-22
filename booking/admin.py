from django.contrib import admin
from django.urls import path, reverse
from django.shortcuts import render
from datetime import date

from .models import Table, Reservation


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
        ]
        return custom_urls + urls

    def table_map_view(self, request):
        today = date.today()
        tables = Table.objects.all()
        reservations = Reservation.objects.filter(reservation_date=today)
        return render(request, "admin/tablemap.html", {
            "tables": tables,
            "reservations": reservations,
            "today": today,
        })
