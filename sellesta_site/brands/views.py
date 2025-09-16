from django.shortcuts import render
from .models import Brand

def brand_slider(request):
    brands = Brand.objects.filter(is_active=True)
    return render(request, "main.html", {"brands": brands})