from datetime import datetime, timedelta
from rest_framework import status,viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ConfirmedAppointment
from .serializer import AppointmentSerializer,AppointmentModel,ConfirmAppSerializer
from rest_framework.decorators import api_view,action
# Create your views here.

class AppointmentViewClass(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    serializer_class=AppointmentSerializer
    serializer_class_two=ConfirmAppSerializer
    queryset = AppointmentModel.objects.all()  # <-- This is mandatory!

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['user'] = request.user.id
        print(data['user'])
        serializer=self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request, *args, **kwargs):
        if request.user.is_superuser:
            print(request.user)
            data=AppointmentModel.objects.all()
            serializer=self.serializer_class(data,many=True)
            print(serializer.data) 
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response({"message":"You are not authorized to view this data"},status=status.HTTP_403_FORBIDDEN)
    
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
        instance = self.get_object()
        print(instance)
        allowed_fields = [
            "fullname",
            "description",
            "user",
            "fromappointmentdate",
            "toappointmentdate",
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
    

    def generate_dates(self,start_date_str, end_date_str):
        # Convert string to datetime object
        start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d")

        # Generate date list
        date_list = []
        current_date = start_date
        while current_date <= end_date:
            date_list.append(current_date.strftime("%Y-%m-%d"))
            current_date += timedelta(days=1)

        return date_list

    @action(detail=True, methods=['GET'], url_path="checkslot")
    def checkslot(self, request, pk=None):
        print(pk)
        instance = self.get_object()
        serializer = self.serializer_class(instance)
        
        checklist=self.generate_dates(serializer.data["fromappointmentdate"],serializer.data["toappointmentdate"])
        print(checklist)
        confirmapp=ConfirmedAppointment.objects.all()
        serializer_two=self.serializer_class_two(confirmapp,many=True)

        listofconfirm = [item['appointeddate'][:10] for item in serializer_two.data]
        print(listofconfirm)
        availslots = [i for i in checklist if i not in listofconfirm]

        
        return Response({
            "message": availslots
        })



    
class ConfirmAppointmentView(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    serializer_class=ConfirmAppSerializer
    queryset = ConfirmedAppointment.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def  list(self, request, *args, **kwargs):
        if request.user.is_superuser:
            data = ConfirmedAppointment.objects.all()
            serializer = self.serializer_class(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "You are not authorized to view this data"}, status=status.HTTP_403_FORBIDDEN)