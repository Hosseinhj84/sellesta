from django.shortcuts import render,get_object_or_404
from .models import Pages
# Create your views here.

def page_detail(request, slug):
    page = get_object_or_404(Pages , slug = slug)
    return render(request , "pages/page_detail.html" , {"pages" : page})