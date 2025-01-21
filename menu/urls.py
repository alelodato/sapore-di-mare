from . import views
from django.urls import path

urlpatterns = [
    path('', views.MenuList.as_view(), name='menu'),
    path('<slug:slug>/', views.menu_detail, name='menu_detail'),
]
