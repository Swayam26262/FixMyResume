from django.utils import timezone
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, EmailOTP, AnalysisHistory
import random
from django.core.mail import send_mail
from django.conf import settings

# 5.1 Registration serializer
class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate_email(self, email):
        try:
            user = User.objects.get(email=email)
            if user.is_active:
                raise serializers.ValidationError("Email already registered and verified")
        except User.DoesNotExist:
            pass  # If user does not exist, email is valid
        return email

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError("Passwords must match")
        return data

# 5.2 OTP verification
class OTPVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)

    def validate(self, data):
        try:
            user = User.objects.get(email=data["email"])
            otp = EmailOTP.objects.filter(user=user, code=data["code"]).last()
        except (User.DoesNotExist, EmailOTP.DoesNotExist):
            raise serializers.ValidationError("Invalid email or code")

        if not otp or not otp.is_valid():
             raise serializers.ValidationError("OTP is invalid or has expired")
        return data

    def save(self):
        user = User.objects.get(email=self.validated_data["email"])
        user.is_active = True
        user.save()
        # optionally delete OTPs for cleanup
        EmailOTP.objects.filter(user=user).delete()
        return user

# 5.3 Login serializer (for custom if desired)
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data["email"], password=data["password"])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        if not user.is_active:
            raise serializers.ValidationError("Account not active")
        data["user"] = user
        return data


class AnalysisHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalysisHistory
        fields = ['id', 'job_description', 'analysis', 'score', 'created_at']