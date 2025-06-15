from django.shortcuts import render
from rest_framework import status,viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializer import AppointmentSerializer,AppointmentModel
# Create your views here.

class AppointmentViewClass(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    serializer_class=AppointmentSerializer
    queryset = AppointmentModel.objects.all()  # <-- This is mandatory!

    def create(self, request, *args, **kwargs):
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request, *args, **kwargs):
        data=AppointmentModel.objects.all()
        serializer=self.serializer_class(data,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def destroy(self, request, *args, **kwargs):
        instance=self.get_object()
        instance.delete()
        return Response({"message":"Instance deleted"},status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer=self.serializer_class(instance)
        return  Response(serializer.data,status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        instance=self.get_object()
        serializer=self.serializer_class(instance,partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

    def partial_update(self, request, *args, **kwargs):
        print("sanchit")
        instance = self.get_object()
        print(instance)
        allowed_fields = [
            "product",
            "vehicleimage",
            "modelname",
            "description",
            "qty",
            "user",
            "appointmentdate",
            "slot",
            "location",
            "purpose",
            "message"
        ]
        print(instance)

        # Update only allowed fields using setattr
        for field in allowed_fields:
            if field in request.data:
                setattr(instance, field, request.data[field])
        
        # Use self.get_serializer
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=400)

            
    # eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5MTUxNDQ1LCJpYXQiOjE3NDkxNDc4NDUsImp0aSI6IjE4ZTQ3ZDY4Nzg1ZTRjMWViMjE1NmZmZmMyMzE2ZTY3IiwidXNlcl9pZCI6MjR9.KPJY9w-aaLELybY3eQXbQt0P7eeYefTqngNe20XT8nw

    # refresh:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0OTIzNDI0NSwiaWF0IjoxNzQ5MTQ3ODQ1LCJqdGkiOiIwMGQxY2IyNzcwYWY0ZTI5OWIzZjMzZTdkN2I3ZTVkMCIsInVzZXJfaWQiOjI0fQ.SqjbprpwupGtm9_qrq5UxreUm0ClkWoHER1FBbILwiw