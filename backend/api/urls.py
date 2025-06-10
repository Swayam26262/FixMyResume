from django.urls import path
from .views import RegisterView, OTPVerifyView, LoginView, TokenRefreshView, LogoutView, AnalysisHistoryView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-otp/', OTPVerifyView.as_view(), name='verify-otp'),
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('analysis-history/', AnalysisHistoryView.as_view(), name='analysis-history'),
]
