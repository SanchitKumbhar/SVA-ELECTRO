from django.db import models
from django.conf import settings
from products.models import Product
from datetime import datetime
from CustomUserModelApp.uuid import UUIDMixin
# Create your models here.

class AppointmentModel(UUIDMixin,models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    modelname=models.CharField(max_length=50)
    description=models.TextField()
    qty=models.IntegerField()
    # Enable this after completing the jwt auth in frontend
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    fromappointmentdate=models.DateField(null=True)
    toappointmentdate=models.DateField(null=True)
    location=models.CharField(max_length=50)
    purpose=models.CharField(max_length=50)
    message=models.TextField()



class ConfirmedAppointment(UUIDMixin,models.Model):
    appointmentcompanyuser= models.ForeignKey(AppointmentModel,on_delete=models.CASCADE)
    appointeddate=models.DateTimeField(default=datetime.today)




