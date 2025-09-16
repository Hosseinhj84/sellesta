"""
URL configuration for sellesta_site project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include,path
from django.shortcuts import render
from pages.models import Pages
from django.conf.urls.static import static
from django.conf import settings
from products.models import Category
from pages.models import Pages
from slider.models import Slide
from brands.models import Brand

def home(request):
    pages = Pages.objects.all()
    categories = Category.objects.all()
    slides = Slide.objects.filter(is_active=True).order_by("id")
    brands = Brand.objects.filter(is_active=True)
    return render(request, "main.html", {"pages": pages, "categories": categories , "slides" : slides , "brands": brands})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home, name="home"),  # این میشه صفحه اصلی سایت
    path("products/", include("products.urls")),
    path("members/",include("members.urls")),
    path("", include("pages.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)