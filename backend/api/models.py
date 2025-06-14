from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models
import uuid
from datetime import timedelta
from django.utils import timezone

# 4.1 Custom user manager
class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, is_active=False, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        user = self._create_user(email, password, **extra_fields)
        user.is_active = True
        user.save(using=self._db)
        return user

# 4.2 Custom user
class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name="api_user_groups",
        related_query_name="api_user",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="api_user_permissions",
        related_query_name="api_user",
    )

    objects = UserManager()

# 4.3 OTP Model
class EmailOTP(models.Model):
    user = models.ForeignKey('api.User', on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)
    purpose = models.CharField(max_length=50, default='registration')  # registration, password_reset, etc.
    expires_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        # When an OTP is created, its 'created_at' is not set until the first save.
        # This is a reliable way to check if the instance is new.
        if not self.created_at:
            self.expires_at = timezone.now() + timedelta(minutes=10)
        super().save(*args, **kwargs)

    def is_expired(self):
        return timezone.now() > self.expires_at

    def is_valid(self):
        return not self.is_expired() and not self.is_used

    def mark_as_used(self):
        self.is_used = True
        self.save()

    def __str__(self):
        return f"{self.user.email} — {self.code} ({self.purpose})"


class AnalysisHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='analysis_history')
    job_description = models.TextField()
    analysis = models.JSONField()
    score = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Analysis for {self.user.email} at {self.created_at.strftime('%Y-%m-%d %H:%M')}"
