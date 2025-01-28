from rest_framework import serializers
from .models import Group, GroupMembership
from django.contrib.auth.models import User

class GroupMembershipSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    role = serializers.ChoiceField(choices=GroupMembership.ROLE_CHOICES)

    class Meta:
        model = GroupMembership
        fields = ['user_id', 'role']


class GroupSerializer(serializers.ModelSerializer):
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    memberships = GroupMembershipSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'created_by', 'memberships', 'created_at', 'updated_at']

    def create(self, validated_data):
        created_by = validated_data.get('created_by')
        
        # Створення групи без членів
        group = Group.objects.create(**validated_data)
        membership_objects = [
            GroupMembership(
                user=created_by,
                group=group,
                role='admin'
            )
        ]
        group.save()

        GroupMembership.objects.create(group=group,**membership_objects)

        return group

    def update(self, instance, validated_data):
        """
        Оновлення групи та додавання нових учасників.
        """
        members_data = validated_data.pop('members', [])
        
        # Оновлення полів групи
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()

        # Додавання нових членів до групи
        try:
            membership_objects = []
            for member_data in members_data:
                membership_objects.append(
                    GroupMembership(
                        user_id=member_data['user_id'],
                        group=instance,
                        role=member_data.get('role', 'member')
                    )
                )

            # Масове створення записів для покращення продуктивності
            GroupMembership.objects.bulk_create(membership_objects)

        except Exception as e:
            raise serializers.ValidationError(f"Помилка при оновленні членів групи: {str(e)}")

        return instance

    def validate_members(self, value):
        """
        Перевірка, чи існують користувачі в базі даних.
        """
        user_ids = [member['user_id'] for member in value]
        if not User.objects.filter(id__in=user_ids).exists():
            raise serializers.ValidationError("Деякі з вказаних користувачів не існують.")
        return value
