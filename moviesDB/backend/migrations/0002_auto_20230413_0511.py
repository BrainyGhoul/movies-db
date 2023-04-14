# Generated by Django 3.2.9 on 2023-04-13 00:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='title',
            name='titleType',
            field=models.CharField(choices=[('M', 'Movie'), ('TV', 'TV Series'), ('EP', 'TV Episode')], max_length=16),
        ),
        migrations.AlterField(
            model_name='watchlist',
            name='name',
            field=models.CharField(max_length=32, unique=True),
        ),
    ]
