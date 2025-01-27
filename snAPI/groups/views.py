from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Group, GroupMembership
from .serializers import GroupSerializer


class GroupListCreateView(ListCreateAPIView):
    """
    Отримання списку груп та створення нової групи.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    #permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Створюємо групу та додаємо автора як адміністратора
        group = serializer.save(created_by=self.request.user)
        GroupMembership.objects.create(user=self.request.user, group=group, role='admin')


class GroupDetailView(RetrieveUpdateDestroyAPIView):
    """
    Перегляд, оновлення та видалення групи.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]


class AddMemberView(APIView):
    """
    Додати учасника до групи.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            group = Group.objects.get(pk=pk)

            # Перевіряємо, чи користувач вже є учасником групи
            if GroupMembership.objects.filter(user=request.user, group=group).exists():
                return Response({"message": "Ви вже є учасником цієї групи!"}, status=status.HTTP_400_BAD_REQUEST)

            # Додаємо користувача як учасника
            GroupMembership.objects.create(user=request.user, group=group, role='member')
            return Response({"message": "Вас додано до групи!"}, status=status.HTTP_200_OK)

        except Group.DoesNotExist:
            return Response({"error": "Групу не знайдено"}, status=status.HTTP_404_NOT_FOUND)


class RemoveMemberView(APIView):
    """
    Видалити учасника з групи.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            group = Group.objects.get(pk=pk)

            # Перевіряємо, чи користувач є учасником групи
            membership = GroupMembership.objects.filter(user=request.user, group=group).first()
            if not membership:
                return Response({"message": "Ви не є учасником цієї групи!"}, status=status.HTTP_400_BAD_REQUEST)

            # Видаляємо учасника
            membership.delete()
            return Response({"message": "Вас видалено з групи!"}, status=status.HTTP_200_OK)

        except Group.DoesNotExist:
            return Response({"error": "Групу не знайдено"}, status=status.HTTP_404_NOT_FOUND)

class GroupMembersView(APIView):
    """
    Отримати список учасників групи.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            group = Group.objects.get(pk=pk)
            
            # Отримуємо всіх учасників цієї групи
            members = group.memberships.all()

            members_list = [{"id": member.user.id, "username": member.user.username, "role": member.role} for member in members]
            return Response({"members": members_list}, status=status.HTTP_200_OK)
        
        except Group.DoesNotExist:
            return Response({"error": "Групу не знайдено"}, status=status.HTTP_404_NOT_FOUND)


#posts
class PostListCreateView(APIView):
    def get(self, request):
        
        groups = request.query_params.get('groups')
        if groups:
            groups_list = groups.split(',')
            posts = Post.objects.filter(group__in=groups_list).order_by('-timestamp')
        else:
            posts = Post.objects.all().order_by('-timestamp')

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
