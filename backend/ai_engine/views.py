import google.generativeai as genai
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

class GeminiSuggestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        task_title = request.data.get("title")

        if not task_title:
            return Response({"error": "Title is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            genai.configure(api_key=settings.GEMINI_API_KEY)

            model = genai.GenerativeModel(model_name="gemini-3-flash-preview")

            prompt = f"User is doing: {task_title}. Suggest one helpful related sub-task in under 15 words."
            response = model.generate_content(prompt)

            return Response({
                "suggestion": response.text,
                "status": "success"
            })

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
