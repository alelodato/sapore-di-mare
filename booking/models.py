from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
# Create your models here.

class Table(models.Model):
     customer = models.CharField(max_length=50, default="customer full name")
     seats = models.IntegerField()
     date = models.DateField(default=datetime.now)
     time = models.TimeField(default=datetime.now)