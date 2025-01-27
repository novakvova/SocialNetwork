from rest_framework.viewsets import ModelViewSet
from .models import Chat
from .serializers import ChatSerializer
from rest_framework.viewsets import ModelViewSet
from .models import Message
from .serializers import MessageSerializer
from django_filters.rest_framework import DjangoFilterBackend
class ChatViewSet(ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    # Можна додати фільтрацію, наприклад, за чатом
    def get_queryset(self):
        queryset = super().get_queryset()
        chat_id = self.request.query_params.get('chat_id')
        if chat_id:
            queryset = queryset.filter(chat_id=chat_id)
        return queryset

class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['chat', 'sender']  # Фільтрація за чатом або автором




























# from rest_framework import generics
# from rest_framework.permissions import IsAuthenticated
# from .models import Chat, Message
# from .serializers import ChatSerializer, MessageSerializer


# class ChatListCreateView(generics.ListCreateAPIView):
#     queryset = Chat.objects.all()
#     serializer_class = ChatSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Chat.objects.filter(participants=self.request.user)

#     def perform_create(self, serializer):
#         chat = serializer.save()
#         chat.participants.add(self.request.user)


# class ChatDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Chat.objects.all()
#     serializer_class = ChatSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Chat.objects.filter(participants=self.request.user)


# class MessageListCreateView(generics.ListCreateAPIView):
#     serializer_class = MessageSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Message.objects.filter(chat_id=self.kwargs['chat_id'])

#     def perform_create(self, serializer):
#         serializer.save(sender=self.request.user, chat_id=self.kwargs['chat_id'])


# class MessageDetailView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = MessageSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Message.objects.filter(chat__participants=self.request.user)
