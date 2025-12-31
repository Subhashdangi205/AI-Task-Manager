from django.urls import path
from .views import GeminiSuggestView

urlpatterns = [
    path('suggest/', GeminiSuggestView.as_view()),
]
