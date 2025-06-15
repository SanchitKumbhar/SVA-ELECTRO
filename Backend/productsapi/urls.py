from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Productview  # Import your viewset explicitly

router = DefaultRouter()
router.register(r'products', Productview, basename='create-product')  

urlpatterns = [
    path('', include(router.urls)),
]