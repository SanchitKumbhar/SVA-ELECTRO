# views.py
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from CustomUserModelApp.models import *
from CustomUserModelApp.models import CustomUser
from .serializer import *
from rest_framework.decorators import action
from rest_framework import viewsets
User=get_user_model()


class UpdateProfileView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UpdateFullProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CustomUser.objects.filter(id=self.request.user.id)  # user can only update self

    def get_object(self):
        return self.request.user

    @action(detail=False, methods=['post'], url_path='change-password')
    def change_password(self, request):
        print(request.data)
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Password changed successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'], url_path="check-type")
    def check(self, request):
        try:
            usertype_instance = User.objects.get(pk=request.user.id)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            if GovernmentDetails.objects.filter(login=usertype_instance).exists():
                gov_detail = GovernmentDetails.objects.get(login=usertype_instance)
                return Response({
                    'type': 'Government',
                    'data': GovernmentDetailsSerializer(gov_detail).data,
                    'email': usertype_instance.email,              # <-- Add this
                    'phonenumber': usertype_instance.phonenumber   # <-- And this
                })
            elif Client.objects.filter(login=usertype_instance).exists():
                client_detail = Client.objects.get(login=usertype_instance)
                print(ClientSerializer(client_detail).data)
                return Response({
                    'type': 'Client',
                    'data': ClientSerializer(client_detail).data,
                    'email': usertype_instance.email,              # <-- Add this
                    'phonenumber': usertype_instance.phonenumber   # <-- And this
                })
            elif PrivateBussines.objects.filter(login=usertype_instance).exists():
                pb_detail = PrivateBussines.objects.get(login=usertype_instance)
                return Response({
                    'type': 'Private Business',
                    'data': PrivateBusinessSerializer(pb_detail).data,
                    'email': usertype_instance.email,              # <-- Add this
                    'phonenumber': usertype_instance.phonenumber   # <-- And this
                })
            else:
                return Response(
                    {"detail": "User type not found in any specific detail model.", 'user_email': usertype_instance.email},
                    status=status.HTTP_404_NOT_FOUND
                )
        except Exception as e:
            return Response(
                {"detail": f"An unexpected error occurred while determining user type: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
    def update(self, request, *args, **kwargs):
        # 1. Get the CustomUser instance to be updated
        usertype_instance = self.get_object()
        print("update method hit in backend (sajkjfbd)") # Debug print for confirmation

        # 2. Initialize the serializer with the instance and incoming data, allow partial updates
        serializer = self.get_serializer(usertype_instance, data=request.data, partial=True)

        try:
            # 3. Validate the serializer once. If not valid, raise_exception=True will automatically
            # return a 400 Bad Request with error details.
            serializer.is_valid(raise_exception=True)

            # 4. Save the serializer. This will trigger the .update() method in your
            # UpdateFullProfileSerializer, which should handle saving the CustomUser
            # and its related detail instances (Client, PrivateBusiness, GovernmentDetails).
            updated_user_instance = serializer.save()

            # 5. Determine the user's role AFTER the update, and fetch the corresponding
            # detail data for the 'data' field in the response.
            # This logic should reflect how your `/check-type/` endpoint determines the type.
            
            response_type = "unknown"
            response_data = {} # For the nested profile details
            
            # --- Determine role and get specific profile data for response ---
            if GovernmentDetails.objects.filter(login=updated_user_instance).exists():
                response_type = 'Government'
                gov_detail = GovernmentDetails.objects.get(login=updated_user_instance)
                response_data = GovernmentDetailsSerializer(gov_detail).data
                
            elif Client.objects.filter(login=updated_user_instance).exists():
                response_type = 'Client'
                client_detail = Client.objects.get(login=updated_user_instance)
                response_data = ClientSerializer(client_detail).data

            elif PrivateBussines.objects.filter(login=updated_user_instance).exists():
                response_type = 'Private Business'
                pb_detail = PrivateBussines.objects.get(login=updated_user_instance)
    
                response_data = PrivateBusinessSerializer(pb_detail).data
            else:
                # Fallback if no specific profile is found (shouldn't happen if user has a role)
                print(f"Warning: No specific profile found for user {updated_user_instance.email} after update.")
                return Response(
                    {"detail": "User type details not found after update.", 'user_email': updated_user_instance.email},
                    status=status.HTTP_404_NOT_FOUND
                )

            # 6. Return the final structured response
            return Response({
                'type': response_type,
                'data': response_data, # This is the *updated* nested profile data
                'user': serializer.data # This is the *updated* CustomUser data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            # Catching general exceptions for debugging, but serializer.is_valid(raise_exception=True)
            # handles most common validation errors.
            print(f"Error during profile update: {e}")
            # If serializer.is_valid() did not raise, this could catch other DB errors etc.
            # If `serializer.errors` is available, it's good to include.
            error_response_data = {"detail": str(e)}
            if hasattr(serializer, 'errors'):
                 error_response_data['errors'] = serializer.errors
            return Response(error_response_data, status=status.HTTP_400_BAD_REQUEST)
