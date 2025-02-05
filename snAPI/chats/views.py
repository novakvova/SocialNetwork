from rest_framework.viewsets import ModelViewSet
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer
from django_filters.rest_framework import DjangoFilterBackend

class ChatViewSet(ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['group_name', 'participants', 'is_group']
    lookup_field = "slug"

class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['chat', 'sender']
