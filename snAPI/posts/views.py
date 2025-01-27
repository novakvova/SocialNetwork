from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .serializers import PostSerializer

class PostListCreateView(APIView):
    def get(self, request):
        # Фільтрація за групами, якщо вказано параметр у запиті
        groups = request.query_params.get('groups')
        if groups:
            groups_list = groups.split(',')
            posts = Post.objects.filter(group__in=groups_list).order_by('-created_at')  # замінив 'timestamp' на 'created_at'
        else:
            posts = Post.objects.all().order_by('-created_at')  # замінив 'timestamp' на 'created_at'

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)