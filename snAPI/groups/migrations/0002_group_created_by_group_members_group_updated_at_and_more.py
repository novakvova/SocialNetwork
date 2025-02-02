# Generated by Django 5.1.4 on 2025-01-17 13:13

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='created_by',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='created_groups', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='group',
            name='members',
            field=models.ManyToManyField(blank=True, related_name='user_groups', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='group',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='group',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='group',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.DeleteModel(
            name='GroupMembership',
        ),
    ]
