from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Client)
admin.site.register(PrivateBussines)
admin.site.register(GovernmentDetails)
admin.site.register(Contact)