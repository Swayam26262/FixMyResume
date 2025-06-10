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
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already registered")
        return email

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError("Passwords must match")
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"]
        )
        # generate OTP
        code = f"{random.randint(100000, 999999)}"
        EmailOTP.objects.create(user=user, code=code)
        # send OTP via email
        send_mail(
            subject="Your verification OTP",
            message=f"Your OTP is: {code}",
            from_email=settings.EMAIL_FROM,
            recipient_list=[user.email],
        )
        return user

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

        if otp.is_expired():
            raise serializers.ValidationError("OTP expired")
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
