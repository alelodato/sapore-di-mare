from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Review(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="commenter")
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)