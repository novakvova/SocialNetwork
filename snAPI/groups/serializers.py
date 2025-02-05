from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Group, GroupMembership

class GroupMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMembership
        fields = ['user', 'role']

class GroupSerializer(serializers.ModelSerializer):
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    created_detail_by = serializers.SerializerMethodField() 
    memberships = GroupMembershipSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'created_by', 'created_detail_by', 'memberships', 'image', 'created_at', 'updated_at']

    def get_created_detail_by(self, obj):
        return obj.created_by.id  
