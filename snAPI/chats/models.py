from django.db import models
from django.contrib.auth import get_user_model
from groups.models import Group

User = get_user_model()

class Chat(models.Model):
    is_group = models.BooleanField(default=False)
    participants = models.ManyToManyField(User, related_name="chats")
    group = models.ForeignKey(Group, null=True, blank=True, related_name="group_chats", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Group Chat - {self.group.name}" if self.is_group else f"Private Chat - {self.id}"

class Message(models.Model):
    chat = models.ForeignKey(Chat, related_name="messages", on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name="messages", on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False) 

    def __str__(self):
        return f"Message by {self.sender.username} at {self.timestamp}"
