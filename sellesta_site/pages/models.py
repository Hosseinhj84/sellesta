from django.urls import reverse
from django.db import models

# Create your models here.

class Pages(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    redirect_url = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("page_detail", args=[self.slug])

class HeaderLinks(models.Model):
    title = models.CharField(max_length=100)
    url = models.CharField(max_length=200)
    order = models.PositiveBigIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ["order"]
    
    def __str__(self):
        return self.title