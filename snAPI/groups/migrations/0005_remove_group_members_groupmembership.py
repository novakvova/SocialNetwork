# Generated by Django 5.1.4 on 2025-01-18 09:55

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0004_alter_group_created_by'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='group',
            name='members',
        ),
        migrations.CreateModel(
            name='GroupMembership',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(choices=[('admin', 'Administrator'), ('member', 'Member')], default='member', max_length=10)),
                ('joined_at', models.DateTimeField(auto_now_add=True)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='memberships', to='groups.group')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'group')},
            },
        ),
    ]
