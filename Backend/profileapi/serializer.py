from rest_framework import serializers
from django.contrib.auth import get_user_model
from CustomUserModelApp.models import GovernmentDetails, PrivateBussines, Client
from CustomUserModelApp.models import CustomUser
from django.contrib.auth.hashers import make_password
# serializers.py

class ChangePasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("New password must be at least 8 characters long")
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.password = make_password(self.validated_data['new_password'])
        user.save()
        return user

class GovernmentDetailsSerializer(serializers.ModelSerializer):
    email=serializers.CharField(source="login.email",read_only=True)

    class Meta:
        model = GovernmentDetails
        fields = "__all__"

class PrivateBusinessSerializer(serializers.ModelSerializer):
    email=serializers.CharField(source="login.email",read_only=True)

    class Meta:
        model = PrivateBussines
        fields = "__all__"

class ClientSerializer(serializers.ModelSerializer):
    email=serializers.CharField(source="login.email",read_only=True)

    class Meta:
        model = Client
        fields = "__all__"

class UpdateFullProfileSerializer(serializers.ModelSerializer):
    government_details = GovernmentDetailsSerializer(required=False)
    private_business = PrivateBusinessSerializer(required=False)
    client_profile = ClientSerializer(required=False)
    class Meta:
        model = CustomUser
        fields = ['email', 'phonenumber', 'government_details', 'private_business', 'client_profile']

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.phonenumber = validated_data.get('phonenumber', instance.phonenumber)
        instance.save()

        # Update related data
        if 'government_details' in validated_data:
            gov, _ = GovernmentDetails.objects.get_or_create(login=instance)
            for key, value in validated_data['government_details'].items():
                setattr(gov, key, value)
            gov.save()

        if 'private_business' in validated_data:
            biz, _ = PrivateBussines.objects.get_or_create(login=instance)
            for key, value in validated_data['private_business'].items():
                setattr(biz, key, value)
            biz.save()

        if 'client_profile' in validated_data:  # <-- fixed key here
            client, _ = Client.objects.get_or_create(login=instance)
            for key, value in validated_data['client_profile'].items():
                setattr(client, key, value)
            client.save()

        return instance
