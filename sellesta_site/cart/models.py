from django.db import models
from django.contrib.auth.models import User
from products.models import Products

# Create your models here.

class Cart(models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE , related_name="cart")
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"سبد خرید {self.user.username}"
    
    @property
    def total_price(Self):
        return sum(item.subtotal for item in Self.item.all())

class CartItem(models.Model):
    cart = models.ForeignKey(Cart , on_delete=models.CASCADE , related_name="item")
    product = models.ForeignKey(Products , on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ("cart" , "product")
    
    def __str__(self):
        return f"{self.product.name} * {self.quantity}"
    
    @property
    def subtotal(self):
        return self.product.price * self.quantity