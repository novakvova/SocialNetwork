# Generated by Django 5.1.4 on 2025-01-30 21:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0009_delete_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='group_images/'),
        ),
    ]
