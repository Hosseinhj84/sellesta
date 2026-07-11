from django.shortcuts import render, get_object_or_404
from .models import Category , Products
from rest_framework import viewsets , permissions
from .serializers import CategorySerializer , ProductsSerializer

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

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "slug"

class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "slug"
