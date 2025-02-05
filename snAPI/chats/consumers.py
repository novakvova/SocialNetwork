import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Chat, Message
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_slug = self.scope['url_route']['kwargs']['slug']
        self.room_group_name = f"chat_{self.chat_slug}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        chat = await self.get_chat(self.chat_slug)
        sender = await self.get_user(data['sender'])

        if chat and sender:
            message = await self.create_message(chat, sender, data['content'])
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "message": message.content,
                    "sender": sender.username,
                    "timestamp": str(message.timestamp)
                }
            )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))

    @staticmethod
    async def get_chat(slug):
        try:
            return await Chat.objects.get(slug=slug)
        except Chat.DoesNotExist:
            return None

    @staticmethod
    async def get_user(user_id):
        try:
            return await User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

    @staticmethod
    async def create_message(chat, sender, content):
        return await Message.objects.create(chat=chat, sender=sender, content=content)
