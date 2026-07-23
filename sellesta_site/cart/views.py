from rest_framework import status , permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Cart , CartItem
from .serializers import CartSerializer
from products.models import Products

class CartDetaiilView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self , request):
        cart , _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

class AddCartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self , request):
        cart , _ = Cart.objects.get_or_create(user = request.user)
        product_id = request.data.get("product_id")
        quantity = int(request.data.get("quantity" , 1))
        
        try:
            product = Products.objects.get(id=product_id)
        except Products.DoesNotExist:
            return Response({"error" : "محصول پیدا نشد"} , status=status.HTTP_404_NOT_FOUND)
        
        item , created = CartItem.objects.get_or_create(cart=cart , product=product)
        
        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity
        
        item.save()
        
        seriallizer = CartSerializer(cart)
        return Response(seriallizer.data , status=status.HTTP_200_OK)

class UpdateCartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def patch(self , request , item_id):
        cart , _ = Cart.objects.get_or_create(user=request.user)
        
        try:
            item = CartItem.objects.get(id=item_id , cart=cart)
        except CartItem.DoesNotExist:
            return Response({"error" : "آیتم پیدا نشد"} , status=status.HTTP_404_NOT_FOUND)
        
        quantity = int(request.data.get("quantity" , item.quantity))
        
        if quantity <= 0:
            item.delete()
        else:
            item.quantity = quantity
            item.save()
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)

class RemoveCartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def delete(self , request , item_id):
        cart , _ = Cart.objects.get(user=request.user)
        
        try:
            item = CartItem.objects.get(id=item_id , cart=cart)
            item.delete()
        except CartItem.DoesNotExist:
            return Response({"error" : "آیتم پیدا نشد."} , status=status.HTTP_404_NOT_FOUND)
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)