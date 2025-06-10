# e:\Django Projects\FixMyResume\backend\parser_app\urls.py
from django.urls import path
from .views import ResumeUploadView, ResumeAnalysisView

urlpatterns = [
    path('parse-resume/', ResumeUploadView.as_view(), name='parse-resume'),
    path('analyze-resume/', ResumeAnalysisView.as_view(), name='analyze-resume'),
]