from django.urls import path
from .views import TaskStatsView, TaskGraphView

urlpatterns = [
    path('task-stats/', TaskStatsView.as_view()),
    path('task-graph/', TaskGraphView.as_view()),
]
