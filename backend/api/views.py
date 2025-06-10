from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView
)
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
        email = request.data.get('email')
        password = request.data.get('password')
        
        if User.objects.filter(email=email).exists():
            return Response(
                {'error': 'Email already exists'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Generate OTP
            otp = generate_otp()
            
            # Create user (inactive)
            user = User.objects.create_user(
                email=email,
                password=password
            )
            user.is_active = False
            user.save()
            
            # Create OTP record
            EmailOTP.objects.create(user=user, code=otp)
            
            # Send OTP via email
            if send_otp_email(email, otp):
                return Response(
                    {'message': 'OTP sent to your email'}, 
                    status=status.HTTP_200_OK
                )
            else:
                # If email sending fails, delete the user and OTP
                user.delete()
                return Response(
                    {'error': 'Failed to send OTP email'}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
                
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

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

class LogoutView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        # Implement token invalidation or session cleanup here
        return Response(
            {'message': 'Logged out successfully'}, 
            status=status.HTTP_200_OK
        )

class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]

class TokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]


class AnalysisHistoryView(generics.ListAPIView):
    serializer_class = AnalysisHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return AnalysisHistory.objects.filter(user=self.request.user).order_by('-created_at')
