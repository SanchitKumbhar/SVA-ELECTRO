from django.urls import path
from CustomUserModelApp import views

urlpatterns = [
    path("",views.index,name="index"),
    path("dashboard",views.dashboard,name="dashboard"),
    path("products",views.products,name="products"),
    path("auth",views.authpage,name="auth"),
    path('register/user/<int:id>', views.signup_view,name="signup"),
    path('login/user', views.login_view,name="login"),
    path('get-jwt', views.get_jwt_token,name="jwt-token"),
    path('contact', views.contact,name="contact"),
    path('update-profile', views.update_profile,name="update-profile"),



]

