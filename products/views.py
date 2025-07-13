from django.shortcuts import render
from django.http import JsonResponse
import json
from .models import Product
from django.core import serializers

# Create your views here.
def productspage(request):
    return render(request,"products.html")

def showproducts(request):
    product=Product.objects.all()
    data = serializers.serialize('json',product)
    data=json.loads(data)
    return JsonResponse({
        'data' : 200
    })

def submitProductpage(request):
    vehicleimage=request.FILES['vehicleimg']
    modelname=request.POST.get('modelname')
    description=request.POST.get('description')
    qty=request.POST.get('qty')
    appointmentdate=request.POST.get('aptdate')
    location=request.POST.get("location")
    slot=request.POST.get('slot')
    purpose=request.POST.get('purpose')
    message=request.POST.get('message')
    user=request.user

    # data=ProductAppointment.objects.create(
    #     vehicleimage=vehicleimage,modelname=modelname,user=user,description=description,appointmentdate=appointmentdate,
    #     qty=qty,slot=slot,location=location,purpose=purpose,message=message
    # )

    return JsonResponse({
        'response'  : 200
    })