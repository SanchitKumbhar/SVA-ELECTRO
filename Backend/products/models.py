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


