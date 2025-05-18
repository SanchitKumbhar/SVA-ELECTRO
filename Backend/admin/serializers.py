from rest_framework import serializers
from .models import *
from products.models import Product


class ProductModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields="__all__"
    
    def create(self, validated_data):
        return Product.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.productname=validated_data.get("productname",instance.productname)
        instance.productcategory=validated_data.get("productcategory",instance.productcategory) 
        instance.stock=validated_data.get("stock",instance.stock)
        instance.productimg=validated_data.get("productimg",instance.productimg)
        instance.cost=validated_data.get("cost",instance.cost)
        instance.description=validated_data.get("description",instance.description)     
        instance.launch=validated_data.get("launch",instance.launch)
        instance.save()
        return instance

    
    