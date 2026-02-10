import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from tasks.models import Task
from django.db.models import Sum, Count, Case, When, IntegerField

class TaskStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        stats = Task.objects.filter(user=user).aggregate(
            total=Count('id'),
            completed_count=Sum(
                Case(When(completed=True, then=1), default=0, output_field=IntegerField())
            ),
            pending_count=Sum(
                Case(When(completed=False, then=1), default=0, output_field=IntegerField())
            )
        )

        completed = stats['completed_count'] or 0
        pending = stats['pending_count'] or 0
        total = stats['total'] or 0

        graph_dir = os.path.join(settings.MEDIA_ROOT, 'graphs')
        os.makedirs(graph_dir, exist_ok=True)
        file_name = f"user_{user.id}_tasks.png"
        file_path = os.path.join(graph_dir, file_name)

        plt.clf()
        plt.figure(figsize=(6, 6))
        plt.pie([completed, pending], labels=['Completed', 'Pending'], colors=['#22c55e', '#ef4444'], autopct='%1.1f%%', startangle=90)
        plt.title(f"Task Progress - {user.username}")
        plt.axis('equal')
        plt.savefig(file_path)
        plt.close('all')

        image_url = request.build_absolute_uri(settings.MEDIA_URL + f"graphs/{file_name}")

        return Response({
            "total_tasks": total,
            "completed_tasks": completed,
            "pending_tasks": pending,
            "graph": image_url
        })

class TaskGraphView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        completed = Task.objects.filter(user=user, completed=True).count()
        pending = Task.objects.filter(user=user, completed=False).count()

        if completed == 0 and pending == 0:
            return Response({"message": "No tasks found to generate graph"}, status=404)

        graph_dir = os.path.join(settings.MEDIA_ROOT, 'graphs')
        os.makedirs(graph_dir, exist_ok=True)
        file_name = f"user_{user.id}_tasks.png"
        file_path = os.path.join(graph_dir, file_name)

        plt.clf()
        plt.figure(figsize=(6, 6))
        plt.pie([completed, pending], labels=['Completed', 'Pending'], colors=['#22c55e', '#ef4444'], autopct='%1.1f%%', startangle=90)
        plt.title(f"Task Progress - {user.username}")
        plt.axis('equal')
        plt.savefig(file_path)
        plt.close('all')

        image_url = request.build_absolute_uri(settings.MEDIA_URL + f"graphs/{file_name}")

        return Response({
            "completed": completed,
            "pending": pending,
            "graph": image_url
        })