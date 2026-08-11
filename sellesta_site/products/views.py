from rest_framework import viewsets , status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category, Products , ProductImage
from .serializers import CategorySerializer, ProductsSerializer , ProductImageSerializer
from sellesta_site.permissions import IsAdminOrReadOnly

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "slug"

class ProductsViewSet(viewsets.ModelViewSet):
    serializer_class = ProductsSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "slug"

    def get_queryset(self):
        queryset = Products.objects.all()

        category_slug = self.request.query_params.get("category")
        if category_slug:
            queryset = queryset.filter(categories__slug=category_slug)

        search = self.request.query_params.get("search")
        if search:
            queryset = queryset.filter(name__icontains=search)

        ordering = self.request.query_params.get("ordering")
        valid_orderings = ["price", "-price", "-created", "name"]
        if ordering in valid_orderings:
            queryset = queryset.order_by(ordering)
        else:
            queryset = queryset.order_by("-created")

        return queryset.distinct()

class ProductImageUploadView(APIView):
    permission_classes = [IsAdminOrReadOnly]
    
    def post(self , request , slug):
        try:
            product = Products.objects.get(slug=slug)
        except Products.DoesNotExist:
            return Response({"error" : "محصول پیدا نشد" }, status=status.HTTP_404_NOT_FOUND)
        
        image_file = self.request.FILES.get("image")
        if not image_file:
            return Response({"error" : "فایلی ارسال نشده"} , status= status.HTTP_400_BAD_REQUEST)
        
        order = request.data.get("order" , 0)
        product_image = ProductImage.objects.create(product=product , image=image_file ,order=order)
        
        return Response(ProductImageSerializer(product_image).data , status=status.HTTP_201_CREATED)

class ProductImageDeleteView(APIView):
    permission_classes = [IsAdminOrReadOnly]
    
    def delete(self , request , image_id):
        try:
            image = ProductImage.objects.get(id=image_id)
            image.delete()
        except ProductImage.DoesNotExist :
            return Response({"error" : "عکس پیدا نشد"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(status=status.HTTP_204_NO_CONTENT)
    