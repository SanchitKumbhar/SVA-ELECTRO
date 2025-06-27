from rest_framework import serializers
from .models import AppointmentModel,ConfirmedAppointment

class AppointmentSerializer(serializers.ModelSerializer):
    productname = serializers.CharField(source='product.productname', read_only=True)
    username=serializers.CharField(source="user.email",read_only=True)

    class Meta:
        model=AppointmentModel
        fields="__all__"

        def create(self,validate_data):
            return AppointmentModel.objects.create(validate_data)
        
        def update(self,instance,validate_data):
            instance.product=validate_data.get("product",instance.product)
            instance.modelname=validate_data.get("modelname",instance.modelname)
            instance.description=validate_data.get("description",instance.description)
            instance.qty=validate_data.get("qty",instance.qty)
            instance.user=validate_data.get("user",instance.user)
            instance.fromappointmentdate=validate_data.get("fromappointmentdate",instance.fromappointmentdate)
            instance.toappointmentdate=validate_data.get("toappointmentdate",instance.toappointmentdate)
            instance.slot=validate_data.get("slot",instance.slot)
            instance.location=validate_data.get("location",instance.location)
            instance.purpose=validate_data.get("purpose",instance.purpose)
            instance.message=validate_data.get("message",instance.message)

class ConfirmAppSerializer(serializers.ModelSerializer):
    class Meta:
        model=ConfirmedAppointment
        fields="__all__"