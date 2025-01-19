from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Menu(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    content = models.TextField()
    excerpt = models.TextField(blank=True)


    class Meta:
        """
        Orders menus."
        """
        ordering = ["title", "slug"]
