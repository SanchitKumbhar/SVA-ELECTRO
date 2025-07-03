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
        # Only update fields present in validated_data (supports partial update)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
