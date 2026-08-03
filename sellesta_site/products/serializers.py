from rest_framework import serializers
from .models import Category, Products , ProductImage

class CategorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "image", "created"]

    def get_image(self, obj):
        return obj.get_image_url()

class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductImage
        fields= ["id" , "image" , "order"]
    
    def get_image(self , obj):
        return obj.image.url if obj.image else None
    

class ProductsSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True, write_only=True, source="categories"
    )
    image = serializers.SerializerMethodField()
    uploaded_image = serializers.ImageField(write_only=True , required=False , source="image")
    gallery = ProductImageSerializer(many=True , read_only=True)

    class Meta:
        model = Products
        fields = [
            "id", "name", "slug", "categories", "category_ids",
            "description", "price", "available", "image" , "created", "gallery" , "uploaded_image"
        ]
    
    def get_image(self , obj):
        return obj.get_image_url()