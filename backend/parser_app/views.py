from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from api.models import AnalysisHistory
from .utils import parse_resume_file 
import os
import json
import re
from google import genai
from google.genai import types

class ResumeUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def post(self, request, *args, **kwargs):
        if 'resume' not in request.FILES:
            return Response(
                {"error": "No resume file provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        resume_file = request.FILES['resume']
        
        # Basic validation for file type (can be enhanced)
        allowed_extensions = ['.pdf', '.docx']
        file_name, file_extension = os.path.splitext(resume_file.name)
        if file_extension.lower() not in allowed_extensions:
            return Response(
                {"error": f"Unsupported file type: {file_extension}. Only PDF and DOCX are allowed."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # The uploaded_file object itself is a stream-like object
            # No need to save it to disk temporarily if parsers can handle streams
            parsed_content = parse_resume_file(resume_file)

            if "Error:" in parsed_content: # Check if parsing returned an error message
                 return Response({"error": parsed_content}, status=status.HTTP_400_BAD_REQUEST)

            return Response(
                {"filename": resume_file.name, "content": parsed_content},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred during parsing: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ResumeAnalysisView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def post(self, request, *args, **kwargs):
        if 'job_description' not in request.data:
            return Response(
                {"error": "No job description provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        job_description = request.data['job_description']
        parsed_resume_content = request.data.get('resume_content', '')

        if not parsed_resume_content:
            return Response(
                {"error": "No resume content provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            if "Error:" in parsed_resume_content:
                return Response({"error": parsed_resume_content}, status=status.HTTP_400_BAD_REQUEST)

            # Initialize Gemini client
            gemini_api_key = os.environ.get("GEMINI_API_KEY")
            if not gemini_api_key:
                return Response(
                    {"error": "GEMINI_API_KEY not found in environment variables."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            client = genai.Client(api_key=gemini_api_key)

            # Construct prompt for Gemini AI
            prompt = f"""
            You are an AI assistant specialized in resume analysis. Your task is to compare a given resume with a job description and provide a score, matched keywords, missing skills, and improvement tips.

            Resume Content:
            {parsed_resume_content}

            Job Description:
            {job_description}

            Please provide your analysis in a JSON format with the following keys:
            - "score": An integer score out of 100, indicating how well the resume matches the job description.
            - "matched_keywords": A list of keywords from the job description that are present in the resume.
            - "missing_skills": A list of skills mentioned in the job description but not clearly found in the resume.
            - "improvement_tips": A list of actionable tips to improve the resume for this specific job description.
            """

            response = client.models.generate_content(
                model="gemini-2.0-flash",
                config=types.GenerateContentConfig(
                    temperature=0.7,
                    top_p=0.95,
                    top_k=40,
                ),
                contents=[prompt]
            )

            # Attempt to parse the AI response as JSON
            try:
                # Extract JSON string from the AI response
                json_match = re.search(r'```json\s*([\s\S]*?)\s*```', response.text)
                if json_match:
                    json_string = json_match.group(1)
                else:
                    # If no markdown block, assume the whole response is JSON
                    json_string = response.text

                ai_analysis = json.loads(json_string)
            except json.JSONDecodeError:
                return Response(
                    {"error": "Failed to parse AI response. Invalid JSON format.", "ai_raw_response": response.text},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            # Save the analysis to history
            score = ai_analysis.get('score')
            if score is not None:
                try:
                    AnalysisHistory.objects.create(
                        user=request.user,
                        job_description=job_description,
                        analysis=ai_analysis,
                        score=int(score)
                    )
                except (ValueError, TypeError):
                    # Optionally handle or log the error if score is not a valid integer
                    pass

            return Response(
                {
                    "filename": "analyzed_resume.txt",
                    "resume_content": parsed_resume_content,
                    "job_description": job_description,
                    "analysis": ai_analysis
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred during analysis: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
