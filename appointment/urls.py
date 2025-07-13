from rest_framework.routers import DefaultRouter
from django.urls import include,path
from .views import AppointmentViewClass
router=DefaultRouter()

router.register(r'appointment',AppointmentViewClass,basename='appointment'),

urlpatterns = [
    path('',include(router.urls)),
]


