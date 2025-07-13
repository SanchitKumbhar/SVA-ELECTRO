from django.db import models
from django.conf import settings
from products.models import Product
from datetime import datetime
from CustomUserModelApp.uuid import UUIDMixin
# Create your models here.

class AppointmentModel(UUIDMixin,models.Model):
    CHOICES=[
        ("1","Consultaion"),
        ("1","Bussiness Meeting"),
        ("1","Other"),
    ]
    fullname=models.CharField(max_length=50)
    purpose=models.CharField(choices=CHOICES,max_length=50)
    description=models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    fromappointmentdate=models.DateField(null=True)
    toappointmentdate=models.DateField(null=True)
    location=models.CharField(max_length=50)
    message=models.TextField()



class ConfirmedAppointment(UUIDMixin,models.Model):
    appointmentcompanyuser= models.ForeignKey(AppointmentModel,on_delete=models.CASCADE)
    appointeddate=models.DateTimeField(default=datetime.today)




