from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

User = get_user_model()

class Chat(models.Model):
    is_group = models.BooleanField(default=False)
    participants = models.ManyToManyField(User, related_name="chats")
    slug = models.SlugField(unique=True, blank=True)
    group_name = models.CharField(max_length=255, blank=True, null=True)  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Group Chat - {self.group_name}" if self.is_group else f"Private Chat - {self.slug}"

class Message(models.Model):
    chat = models.ForeignKey(Chat, related_name="messages", on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name="messages", on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message by {self.sender.username} at {self.timestamp}"
