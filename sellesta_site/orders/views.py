from django.shortcuts import render
from rest_framework import permissions , status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
from .models import Order , OrderItem
from .serializers import OrderSerializer , CreateOrderSerializer
from cart.models import Cart

# Create your views here.

class CreateOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self , request):
        serializer = CreateOrderSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        
        try :
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response(
                {"error":"سبد خرید شما خالی است"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        cart_items = cart.items.all()
        
        if not cart_items.exists():
            return Response(
                {"error" : "سبد خرید شما خالی است"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        with transaction.atomic():
            order = Order.objects.create(
                user = request.user,
                status="paid",
                total_price = cart.total_price,
                **serializer.validated_data,
            )
            
            for cart_item in cart_items:
                OrderItem.objects.create(
                    order=order,
                    product=cart_item.product,
                    product_name = cart_item.product.name,
                    price = cart_item.product.price,
                    quantity=cart_item.quantity,
                )
            cart_items.delete()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)

class OrderListView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self , request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders , many=True)
        return Response(serializer.data)
