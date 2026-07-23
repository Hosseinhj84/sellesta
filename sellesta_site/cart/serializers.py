from rest_framework import serializers
from .models import CartItem , Cart
from products.serializers import ProductsSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductsSerializer(read_only=True)
    subtotal = serializers.ReadOnlyField()
    
    class Meta:
        model = CartItem
        fields = ["id" , "product" , "quantity" , "subtotal"]

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True , read_only=True)
    total_price = serializers.ReadOnlyField()
    
    class Meta:
        model = Cart
        fields = ["id" , "items" , "total_price"]
