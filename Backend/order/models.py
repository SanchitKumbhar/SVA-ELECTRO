from django.db import models
from products.models import Product
from django.conf import settings
from CustomUserModelApp.uuid import UUIDMixin

# Create your models here.
class Orders(UUIDMixin,models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]
    order_id = models.CharField(max_length=255, unique=True)
    customer_name = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product_name = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=STATUS_CHOICES,max_length=50, default='Pending')

    def __str__(self):
        return f"Order {self.order_id} by {self.customer_name}"