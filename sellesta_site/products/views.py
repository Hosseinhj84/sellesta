from django.shortcuts import render, get_object_or_404
from .models import Category

def category_detail(request, slug):
    category = get_object_or_404(Category, slug=slug)
    products = category.products.all()
    return render(request, "category_detail.html", {
        "category": category,
        "products": products,
    })
    
def home(request):
    categorys = Category.objects.all()
    return render(request, "main.html", {"categorys": categorys})

def category_slider(request):
    categories = Category.objects.all()
    return render(request, "products/category_slider.html", {"categories": categories})
