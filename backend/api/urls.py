from django.urls import path, include
from .views import RegisterView, OTPVerifyView, AnalysisHistoryView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('otp/verify/', OTPVerifyView.as_view(), name='otp-verify'),
    path('history/', AnalysisHistoryView.as_view(), name='analysis-history'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include('dj_rest_auth.urls')),
]
