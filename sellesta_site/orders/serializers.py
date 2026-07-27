from rest_framework import serializers
from .models import OrderItem , Order

class OrderItemSerializer(serializers.ModelSerializer):
    subtotal = serializers.ReadOnlyField()
    
    class Meta:
        model = OrderItem
        fields = ["id" , "product_name" , "price" , "quantity" , "subtotal"]

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True , read_only = True)
    
    class Meta:
        model = Order
        fields = [ "id" , "status" , "full_name" , "phone" , "address" , "postal_code" , "total_price" , "items" , "created" ,]

class CreateOrderSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length = 200)
    phone = serializers.CharField(max_length=20)
    address = serializers.CharField()
    postal_code = serializers.CharField(max_length=20,required=False , allow_blank=True)

