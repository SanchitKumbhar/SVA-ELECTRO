from rest_framework import serializers
from .models import AppointmentModel

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=AppointmentModel
        fields="__all__"

        def create(self,validate_data):
            return AppointmentModel.objects.create(validate_data)
        
        def update(self,instance,validate_data):
            instance.product=validate_data.get("product",instance.product)
            instance.vehicleimage=validate_data.get("vehicleimage",instance.vehicleimage)
            instance.modelname=validate_data.get("modelname",instance.modelname)
            instance.description=validate_data.get("description",instance.description)
            instance.qty=validate_data.get("qty",instance.qty)
            instance.user=validate_data.get("user",instance.user)
            instance.appointmentdate=validate_data.get("appointmentdate",instance.appointmentdate)
            instance.slot=validate_data.get("slot",instance.slot)
            instance.location=validate_data.get("location",instance.location)
            instance.purpose=validate_data.get("purpose",instance.purpose)
            instance.message=validate_data.get("message",instance.message)
