from django.contrib import admin
from .models import Menu
from django_summernote.admin import SummernoteModelAdmin

# Register your models here.
@admin.register(Menu)

class MenuAdmin(SummernoteModelAdmin):
    list_display = ('title', 'slug',)
    search_fields = ['title']
    prepopulated_fields = {'slug': ('title',)}
    summernote_fields = ('content',)