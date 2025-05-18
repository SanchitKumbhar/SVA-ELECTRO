from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import ProductModelSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from products.models import Product
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


class Productview(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset=Product.objects.all()
    serializer_class=ProductModelSerializer
    parser_classes = [MultiPartParser, FormParser]  

    def create(self, request, *args, **kwargs):
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request, *args, **kwargs):
        data=Product.objects.all()
        serializer=self.serializer_class(data,many=True)
        return Response(serializer.data)
    
    def update(self, request,*args, **kwargs):
            partial=kwargs.pop('partial', False)
            try:
                instance = self.get_object()  # DRF built-in; raises 404 if not found
            except Product.DoesNotExist:
                return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

            serializer=self.serializer_class(instance,data=request.data,partial=partial)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        try:
            instance=self.get_object()
            instance.delete()
            return Response({"message":"Product deleted successfully"},status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response({"error":"Product not found"},status=status.HTTP_404_NOT_FOUND) 

        
    def retrieve(self, request,pk=None):
        try:
            instance=self.queryset.get(pk=pk)
            serializer=self.serializer_class(instance)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"error":"Product not found"},status=status.HTTP_404_NOT_FOUND)


    
    