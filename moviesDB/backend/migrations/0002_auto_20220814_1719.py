# Generated by Django 3.2.9 on 2022-08-14 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='user_type',
        ),
        migrations.AddField(
            model_name='user',
            name='is_celebrity',
            field=models.BooleanField(default=False),
        ),
    ]
