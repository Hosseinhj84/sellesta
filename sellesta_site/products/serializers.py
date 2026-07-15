from rest_framework import serializers
from .models import Category, Products

class CategorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "image", "created"]

    def get_image(self, obj):
        return obj.get_image_url()


class ProductsSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True, write_only=True, source="categories"
    )
    image = serializers.SerializerMethodField()

    class Meta:
        model = Products
        fields = [
            "id", "name", "slug", "categories", "category_ids",
            "description", "price", "available", "image" , "created",
        ]
    
    def get_image(self , obj):
        return obj.get_image_url()