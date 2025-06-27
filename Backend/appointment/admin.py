from django.contrib import admin
from .models import AppointmentModel,ConfirmedAppointment
# Register your models here.
admin.site.register(AppointmentModel)
admin.site.register(ConfirmedAppointment)   
