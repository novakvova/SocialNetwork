from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ChatViewSet, MessageViewSet

router = DefaultRouter()
router.register(r'chats', ChatViewSet, basename='chat')
router.register(r'messages', MessageViewSet, basename='message')

urlpatterns = router.urls



# from django.urls import path
# from .views import ChatListCreateView, ChatDetailView, MessageListCreateView, MessageDetailView

# urlpatterns = [
#     path('', ChatListCreateView.as_view(), name='chat-list-create'),
#     path('<int:pk>/', ChatDetailView.as_view(), name='chat-detail'),
#     path('<int:chat_id>/messages/', MessageListCreateView.as_view(), name='message-list-create'),
#     path('messages/<int:pk>/', MessageDetailView.as_view(), name='message-detail'),
# ]
