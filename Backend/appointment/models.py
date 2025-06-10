from django.db import models
from django.conf import settings
from products.models import Product
# Create your models here.

class AppointmentModel(models.Model):
    SLOT_CHOICES=[
        ('A',"Afternoon"),
        ('E','Evening'),
        ('M','Morning')
    ]
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    modelname=models.CharField(max_length=50)
    description=models.TextField()
    qty=models.IntegerField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    appointmentdate=models.DateField(null=True)
    slot=models.CharField(max_length=2,choices=SLOT_CHOICES,default='A')
    location=models.CharField(max_length=50)
    purpose=models.CharField(max_length=50)
    message=models.TextField()

