from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.permissions import IsAuthenticated
from .serializers import OrderSerializer,Orders
from rest_framework.response import Response
# Create your views here.

class OrderViewclass(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    serializer_class=OrderSerializer
    queryset=Orders.objects.all()

    def create(self, request, *args, **kwargs):
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request, *args, **kwargs):
        if request.user.is_superuser:
            data = Orders.objects.all()
            print(data)
            serializer=self.serializer_class(data,many=True)
            return Response(serializer.data)
        return Response({"message":"You are not authorized to view this data"},status=status.HTTP_403_FORBIDDEN)
    
    def update(self, request, *args, **kwargs):
        partial=kwargs.pop("partial",False)
        try:
            instance=self.get_object()
        except Orders.DoesNotExist:
                return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer=self.serializer_class(instance,data=request.data,partial=partial)
        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        try:
            instance=self.get_object()
            instance.delete()
            return Response({"message":"Order deleted successfully"},status=status.HTTP_204_NO_CONTENT)
        except Orders.DoesNotExist:
            return Response({"error":"Order not found"},status=status.HTTP_404_NOT_FOUND) 

    def retrieve(self, request,pk=None):
        try:
            instance=self.queryset.get(pk=pk)
            serializer=self.serializer_class(instance)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Orders.DoesNotExist:
            return Response({"error":"Order not found"},status=status.HTTP_404_NOT_FOUND)
    
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
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

    
    