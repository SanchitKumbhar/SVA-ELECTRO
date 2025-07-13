from django.contrib.auth import get_user_model, authenticate, login,logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Client, PrivateBussines, GovernmentDetails,Contact

User = get_user_model()

# ✅ Signup using Django Auth (Session-based)

def signup_view(request, id):
    email = request.POST.get('email')
    password = request.POST.get('password')
    phonenumber = request.POST.get('phonenumber')

    if User.objects.filter(email=email).exists():
        return JsonResponse({'error': 'User already exists'}, status=400)

    user = User.objects.create_user(email=email, password=password, phonenumber=phonenumber)
    # Optional user-type specific models
    if id == 1:

        fullname = request.POST.get('fullname')
        print(fullname)
        Client.objects.create(login=user, fullname=fullname, phone_number=phonenumber)
    elif id == 2:
        name = request.POST.get('name')
        registration_no = request.POST.get('code')
        address = request.POST.get('address')
        PrivateBussines.objects.create(
            login=user,
            business_name=name,
            address=address,
            registration_no=registration_no,
            phone_number=phonenumber
        )
    elif id == 3:
        name = request.POST.get('fullname')
        code = request.POST.get('code')
        GovernmentDetails.objects.create(login=user, department=name, gov_id=code)
    else:
        return JsonResponse({'error': 'Invalid user type'}, status=400)

    login(request, user)  # Session login
    return redirect("/products")
# ✅ Login using Django Auth (Session-based)

def login_view(request):
    email = request.POST.get('email')
    password = request.POST.get('password')

    user = authenticate(request, email=email, password=password)
    if user:
        login(request, user)
        return redirect("products")
    return JsonResponse({'error': 'Invalid credentials'}, status=401)

# ✅ JWT Token generation for form-based API use (call this after login)
def get_jwt_token(request):
    user = request.user
    if user != "AnonymousUser":  # Correct way is: if request.user.is_authenticated:
        refresh = RefreshToken.for_user(user)
        return JsonResponse({
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        })
    else:
        return JsonResponse({
            'message': "Invalid Data"
        })

@login_required
def products(request):
    return render(request,"products.html")

def authpage(request):
    return render(request,"authentication.html")

def log_out(request):
    logout(request)
    return redirect("/")

def index(request):
    return render(request,"index.html")

@login_required
def dashboard(request):
    return render(request,"admin.html")


# NO API for contact if requiered convert same view to a small api
def contact(request):
    fullname=request.POST.get("fullname")
    email=request.POST.get("email")
    company=request.POST.get("company")
    message=request.POST.get("message")

    from .models import Contact

    Contact.objects.create(fullname=fullname,email=email,company=company,message=message)

    return redirect("/")

from django.core import serializers
def get_contacts(request):
    # if request.user.is_superuser:
        return JsonResponse({
            'data' : serializers.serialize("json",Contact.objects.all())
        })
    # else:
    #     return JsonResponse({
    #         "error" : "invalid user permissions"
    #     })
def update_profile(request):
    return render(request,"userProfile.html")

def paymentpage(request):
    return render(request,"payment.html")
