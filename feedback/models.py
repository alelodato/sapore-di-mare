from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Review(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="commenter")
    description = models.TextField(blank=True, null=True)
    rating = models.PositiveIntegerField(choices=((1, '1 star'),(2, '2 star'),(3,'3 star'),(4,'4 star'),(5,'5 star')))
    created_on = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ["created_on"]

    def __str__(self):
        return self.body
