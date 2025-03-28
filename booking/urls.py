from . import views
from django.urls import path

urlpatterns = [
    path('reservations/', views.ReservationList.as_view(),
         name='reservations'),
    path('add/', views.add_reservation, name='add-reservation'),
    path('delete/<int:id>/', views.delete_reservation,
         name='delete-reservation'),
    path('delete/confirmdelete/<int:id>/', views.confirm_delete_reservation,
         name='confirm-delete-reservation'),
    path('edit/<int:id>/', views.edit_reservation, name='edit-reservation'),
]
