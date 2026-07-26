from django.db import models
from django.contrib.auth.models import User
from products.models import Products

# Create your models here.

class Order(models.Model):
    STATUS_CHOICES = [
        ("pending" , "در انتظار پرداخت"),
        ("paid" , "پرداخت شده"),
        ("shipped" , "ارسال شده"),
        ("delivered" , "تحویل شده"),
        ("cancelled" , "لغو شده"),
    ]
    
    user = models.ForeignKey(User , on_delete=models.CASCADE , related_name="orders")
    status = models.CharField(max_length=20 , choices=STATUS_CHOICES , default="pending")
    
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    postal_code = models.CharField(max_length=20 , blank=True)
    
    total_price = models.DecimalField(max_digits=12 , decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta :
        ordering = ["-created"]
    
    def __str__(self):
        return f"سفارش #{self.id} - {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order , on_delete=models.CASCADE , related_name="items")
    product = models.ForeignKey(Products , on_delete=models.SET_NULL , null=True)
    product_name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10 , decimal_places=2)
    quantity = models.PositiveBigIntegerField()
    
    def __str__(self):
        return f"{self.product_name} x {self.quantity}"
    
    @property
    def subtotal(self):
        return self.price * self.quantity
    