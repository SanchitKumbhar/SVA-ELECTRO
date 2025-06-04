from django.shortcuts import render,redirect
from django.contrib.auth import get_user_model,authenticate,login
from django.http import JsonResponse
from .models import *
User = get_user_model()

# Create your views here.
def home(request):
    print(request.user  )
    return render(request,"index.html")

def loginuser(request):
    return render(request,"login.html")

def loginaction(request):
    email = request.POST.get("email")
    password=request.POST.get("password")
    print(password)

    user=authenticate(request,email=email,password=password)
    print(user)
    if user is not None:
        login(request,user)
        return redirect("/products")


def registeruseraction(request,id):
    def check(user):
        login(request, user)  
    if id == 1:
        if request.method == "POST":
            email=request.POST.get("email")
            fullname=request.POST.get("fullname")
            phonenumber=request.POST.get("phonenumber")
            password=request.POST.get("password")
            print(id,email)
            user=User.objects.create_user(email=email,password=password,phonenumber=phonenumber)    
            Client.objects.create(login=user,fullname=fullname,phone_number=phonenumber)
            check(user)
            return redirect("/products")

    elif id == 2:
            if request.method == "POST":
                email=request.POST.get("email")
                registration_no=request.POST.get("code")
                name=request.POST.get("name")
                phonenumber=request.POST.get("phonenumber")
                address=request.POST.get("address")
                password=request.POST.get("password")
                print(email,password)
                user=User.objects.create_user(email=email,password=password,phonenumber=phonenumber)    
                PrivateBussines.objects.create(login=user,business_name=name,address=address,registration_no=registration_no,phone_number=phonenumber)
                check(user)
                return redirect("/products")

            
    else:
            if request.method == "POST":
                email=request.POST.get("email")
                name=request.POST.get("fullname")
                code=request.POST.get("code")
                password=request.POST.get("password")

                User.objects.create_user(email=email,password=password,phonenumber=phonenumber)
                user=User.objects.create_user(email=email,password=password,phonenumber=phonenumber)    
                GovernmentDetails.objects.create(login=user,department=name,gov_id=code)
                check(user)
                return redirect("/products")


def dashboard(request):
     return render(request,"admin.html")