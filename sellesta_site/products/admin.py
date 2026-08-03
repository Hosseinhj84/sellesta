from django.contrib import admin
from .models import Category, Products, ProductImage


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "created")
    prepopulated_fields = {"slug": ("name",)}


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Products)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "available", "created")
    list_filter = ("available", "categories")
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}
    filter_horizontal = ("categories",)
    inlines = [ProductImageInline]