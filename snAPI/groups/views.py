from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, filters
from .models import Group, GroupMembership
from .serializers import GroupSerializer
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

class GroupViewSet(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    #permission_classes = [IsAuthenticated]

class GroupMembershipMixin:
    """Допоміжний клас для роботи з членами групи"""
    def get_group(self, pk):
        return Group.objects.filter(pk=pk).first()
    
    def modify_membership(self, request, pk, add=True):
        group = self.get_group(pk)
        if not group:
            return Response({"error": "Групу не знайдено"}, status=status.HTTP_404_NOT_FOUND)
        
        if add:
            if GroupMembership.objects.filter(user=request.user, group=group).exists():
                return Response({"message": "Користувач вже в групі!"}, status=status.HTTP_400_BAD_REQUEST)
            GroupMembership.objects.create(user=request.user, group=group, role='member')
            return Response({"message": "Користувача додано!"}, status=status.HTTP_201_CREATED)
        
        membership = GroupMembership.objects.filter(user=request.user, group=group).first()
        if not membership:
            return Response({"message": "Користувач не є членом групи!"}, status=status.HTTP_400_BAD_REQUEST)
        membership.delete()
        return Response({"message": "Користувача видалено!"}, status=status.HTTP_200_OK)

class AddMemberView(APIView, GroupMembershipMixin):
    #permission_classes = [IsAuthenticated]
    def post(self, request, pk):
        return self.modify_membership(request, pk, add=True)

class RemoveMemberView(APIView, GroupMembershipMixin):
    #permission_classes = [IsAuthenticated]
    def post(self, request, pk):
        return self.modify_membership(request, pk, add=False)

class GroupMembersView(APIView):
    #permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        group = Group.objects.prefetch_related('memberships__user').filter(pk=pk).first()
        if not group:
            return Response({"error": "Групу не знайдено"}, status=status.HTTP_404_NOT_FOUND)

        members = [
            {"id": member.user.id, "username": member.user.username, "role": member.role}
            for member in group.memberships.all()
        ]
        return Response({"members": members}, status=status.HTTP_200_OK)

class GroupViewSet(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['created_by']
    search_fields = ['name', 'description']