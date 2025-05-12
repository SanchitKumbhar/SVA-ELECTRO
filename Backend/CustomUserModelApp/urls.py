from django.urls import path
from CustomUserModelApp import views

urlpatterns = [
    path("",views.home,name="home"),
    path("login",views.loginuser,name="login"),
    path("register/user/<int:id>",views.registeruseraction,name="register"),
    path("login/user",views.loginaction,name="login"),
]

