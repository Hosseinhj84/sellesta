from rest_framework.routers import DefaultRouter
from products.views import CategoryViewSet , ProductsViewSet
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView
from pages.views import HeaderLinkViewSet

router = DefaultRouter()
router.register(r"categories" , CategoryViewSet , basename="category")
router.register(r"products" , ProductsViewSet , basename="product")
router.register(r"header-links" , HeaderLinkViewSet , basename="header-links")

urlpatterns = [
    path("token/" , TokenObtainPairView.as_view() , name="token_obtain_pair"),
    path("token/refresh/" , TokenRefreshView.as_view() , name="token_refresh")
] + router.urls