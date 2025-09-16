from django.contrib import admin
from .models import Category, Products


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "created")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Products)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "available", "created")
    list_filter = ("available", "categories")
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}

    filter_horizontal = ("categories",)  # برای انتخاب راحت‌تر دسته‌بندی‌ها
