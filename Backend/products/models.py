from django.db import models
from django.conf import settings
import datetime
# Create your models here.

class Product(models.Model):
    PRODUCT_CATEGORY=[
        ("1","Electric Buses"),
        ("2,","Charging Equipment"),
        ("3","Spare Parts"),
        ("4","Accessories")
    ]
    productname=models.CharField(max_length=100)
    productcategory=models.CharField(max_length=4,choices=PRODUCT_CATEGORY,default="1")
    stock=models.IntegerField(default=0)
    productimg=models.ImageField(upload_to='static/productimg')
    cost=models.IntegerField()
    description=models.TextField()
    launch=models.DateField(default=datetime.date.today)

class ProductAppointment(models.Model):
    SLOT_CHOICES=[
        ('A',"Afternoon"),
        ('E','Evening'),
        ('M','Morning')
    ]
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    vehicleimage = models.ImageField(upload_to="vehicleimg")
    modelname=models.CharField(max_length=50)
    description=models.TextField()
    qty=models.IntegerField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    appointmentdate=models.DateField(null=True)
    slot=models.CharField(max_length=2,choices=SLOT_CHOICES,default='A')
    location=models.CharField(max_length=50)
    purpose=models.CharField(max_length=50)
    message=models.TextField()
