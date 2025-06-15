from rest_framework import serializers
from .models import Orders

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'
        read_only_fields = ['order_id', 'order_date']
        extra_kwargs = {
            'customer_name': {'required': True},
            'product_name': {'required': True},
            'quantity': {'required': True, 'min_value': 1},
            'status': {'required': False}
        }

    def create(self, validated_data):
        return Orders.objects.create(**validated_data)
        
    def update(self, instance, validated_data):
        instance.customer_name = validated_data.get("customer_name", instance.customer_name)
        instance.product_name = validated_data.get("product_name", instance.product_name)
        instance.quantity = validated_data.get("quantity", instance.quantity)
        instance.status = validated_data.get("status", instance.status)
        instance.save()
        return instance
