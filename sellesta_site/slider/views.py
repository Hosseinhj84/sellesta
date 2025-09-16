from django.shortcuts import render
from slider.models import Slide

def home(request):
    slides = Slide.objects.filter(is_active=True).order_by("id")
    return render(request, "main.html", { "slides": slides,})