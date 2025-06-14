from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import (
    RegisterSerializer, OTPVerifySerializer, AnalysisHistorySerializer
)
from .models import EmailOTP, User, AnalysisHistory
from .utils import generate_otp, send_otp_email
from django.db import transaction
import random

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        email = validated_data.get('email')
        password = validated_data.get('password')

        try:
            user, created = User.objects.get_or_create(email=email)

            if not created and user.is_active:
                return Response(
                    {'error': 'Email already registered and verified'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Update password and deactivate again (just in case)
            user.set_password(password)
            user.is_active = False
            user.save()

            # Remove old OTPs
            EmailOTP.objects.filter(user=user).delete()

            # Generate and send OTP
            otp = generate_otp()
            EmailOTP.objects.create(user=user, code=otp, purpose='registration')
            if send_otp_email(email, otp):
                message = 'OTP sent to your email'
                if not created:
                    message = 'It looks like you already signed up but didn’t verify your email. A new OTP has been sent to your email address.'
                return Response(
                    {'message': message},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'Failed to send OTP email'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OTPVerifyView(generics.CreateAPIView):
    serializer_class = OTPVerifySerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        code = request.data.get('code')
        
        try:
            user = User.objects.get(email=email)
            otp = EmailOTP.objects.filter(
                user=user,
                code=code,
                purpose='registration'
            ).last()
            
            if not otp:
                return Response(
                    {'error': 'Invalid OTP'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if not otp.is_valid():
                if otp.is_expired():
                    return Response(
                        {'error': 'OTP has expired'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
                if otp.is_used:
                    return Response(
                        {'error': 'OTP has already been used'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            # Activate user
            user.is_active = True
            user.save()
            
            # Mark OTP as used
            otp.mark_as_used()
            
            # Clean up other unused OTPs for this user
            EmailOTP.objects.filter(
                user=user,
                purpose='registration',
                is_used=False
            ).delete()
            
            return Response(
                {'message': 'Registration successful'}, 
                status=status.HTTP_201_CREATED
            )
            
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

class AnalysisHistoryView(generics.ListAPIView):
    serializer_class = AnalysisHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all the analysis history
        for the currently authenticated user.
        """
        return AnalysisHistory.objects.filter(user=self.request.user).order_by('-created_at')