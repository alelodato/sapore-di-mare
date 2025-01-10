from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
# Create your models here.

class Table(models.Model):
     customer = models.ForeignKey(User, on_delete=models.CASCADE,related_name="customer")
     seats = models.CharField(max_length=10, default="2")
     date = models.DateField(default=datetime.now)
     time = models.CharField(max_length=10, default="12PM")