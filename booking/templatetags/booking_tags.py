from django import template

register = template.Library()

@register.filter
def get_reservation(reservations, table):
    return reservations.filter(table=table).first()