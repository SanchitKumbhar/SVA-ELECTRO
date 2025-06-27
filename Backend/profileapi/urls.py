from rest_framework.routers import DefaultRouter
from django.urls import include,path
from .views import UpdateProfileView
router=DefaultRouter()

router.register(r'profile',UpdateProfileView,basename='profile')
urlpatterns = [
    path('',include(router.urls)),
]


