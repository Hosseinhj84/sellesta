from rest_framework.routers import DefaultRouter
from products.views import CategoryViewSet , ProductsViewSet
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView
from pages.views import HeaderLinkViewSet , PageViewSet
from members.views import RegisterView , ProfileView
from cart.views import CartDetaiilView , AddCartItemView , UpdateCartItemView , RemoveCartItemView
from orders.views import CreateOrderView , OrderListView , AdminOrderViewSet
from products.views import ProductImageDeleteView , ProductImageUploadView

router = DefaultRouter()
router.register(r"categories" , CategoryViewSet , basename="category")
router.register(r"products" , ProductsViewSet , basename="product")
router.register(r"header-links" , HeaderLinkViewSet , basename="header-links")
router.register(r"pages" , PageViewSet , basename="pages")
router.register(r"admin/orders" , AdminOrderViewSet , basename="admin-order")

urlpatterns = [
    path("token/" , TokenObtainPairView.as_view() , name="token_obtain_pair"),
    path("token/refresh/" , TokenRefreshView.as_view() , name="token_refresh"),
    path("register/" , RegisterView.as_view() , name="register"),
    path("profile/" , ProfileView.as_view() , name="profile"),
    path("cart/" , CartDetaiilView.as_view() , name="cart-detail"),
    path("cart/add/" , AddCartItemView.as_view() , name="cart-add"),
    path("cart/item/<int:item_id>/" , UpdateCartItemView.as_view() , name="cart-item-update"),
    path("cart/item/<int:item_id>/remove/" , RemoveCartItemView.as_view(), name="cart-item-remove"),
    path("orders/create/", CreateOrderView.as_view() , name="order_create"),
    path("orders/" , OrderListView.as_view() , name="order-list"),
    path("products/<str:slug>/images/" , ProductImageUploadView.as_view() , name="product-image-upload"),
    path("products/image/<int:image_id>/" , ProductImageDeleteView.as_view() , name="product-image-delete")
] + router.urls