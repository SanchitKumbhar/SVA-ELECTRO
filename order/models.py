from django.db import models
from products.models import Product
from django.conf import settings
from CustomUserModelApp.uuid import UUIDMixin

# Create your models here.
class Orders(UUIDMixin, models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]
    order_id = models.CharField(max_length=4, unique=True, editable=False)
    customer_name = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product_name = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=50, default='Pending')

    def save(self, *args, **kwargs):
        if not self.order_id:
            # Get the last order_id and increment
            last_order = Orders.objects.order_by('-order_id').first()
            if last_order and last_order.order_id.isdigit():
                next_id = int(last_order.order_id) + 1
            else:
                next_id = 1
            self.order_id = f"{next_id:04d}"  # Pad with zeros to 4 digits
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order {self.order_id} by {self.customer_name}"