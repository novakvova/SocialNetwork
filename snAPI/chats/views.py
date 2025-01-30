from rest_framework.viewsets import ModelViewSet
from .models import Chat
from .serializers import ChatSerializer
from rest_framework.viewsets import ModelViewSet
from .models import Message
from .serializers import MessageSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated

class ChatViewSet(ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['group', 'participants','is_group']
    
    

class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['chat', 'sender'] 

    def get_queryset(self):
        queryset = super().get_queryset()
        chat_id = self.request.query_params.get('chat_id')
        if chat_id:
            queryset = queryset.filter(chat_id=chat_id)
        return queryset

