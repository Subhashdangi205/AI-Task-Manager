import google.generativeai as genai
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

class GeminiSuggestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        title = request.data.get("title")
        description = request.data.get("description", "")

        if not title and not description:
            return Response(
                {"error": "Title or description is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel("gemini-3-flash-preview")

            prompt = f"""
You are an expert mentor for ANY field.

LANGUAGE RULE:
- If user input is Hindi or Hinglish → respond in Hindi/Hinglish
- If user input is English → respond in English

TASK TITLE:
"{title}"

TASK DESCRIPTION (MAIN CONTEXT):
"{description}"

Create a clear, structured roadmap so that even a beginner understands
from basic to advanced level.

FORMAT RULES:
- Markdown only
- Headings + bullet points
- Simple, practical language
- No long paragraphs

STRUCTURE:
## Title
### Level 1: Beginner
### Level 2: Intermediate
### Level 3: Advanced
### Practical Actions
### Common Mistakes
### Final Tips
"""

            response = model.generate_content(prompt)

            return Response({
                "suggestion": response.text,
                "status": "success"
            })

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
