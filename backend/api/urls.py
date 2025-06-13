from django.urls import path, include
from .views import RegisterView, OTPVerifyView, AnalysisHistoryView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('otp/verify/', OTPVerifyView.as_view(), name='otp-verify'),
    path('history/', AnalysisHistoryView.as_view(), name='analysis-history'),
    path('', include('dj_rest_auth.urls')),
]
