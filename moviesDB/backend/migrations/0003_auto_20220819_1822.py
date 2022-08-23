# Generated by Django 3.2.9 on 2022-08-19 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20220814_1719'),
    ]

    operations = [
        migrations.AlterField(
            model_name='title',
            name='titleType',
            field=models.CharField(choices=[('0', 'Movie'), ('1', 'TVSeries'), ('2', 'TVEpisode')], max_length=16),
        ),
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('0', 'actor'), ('1', 'director'), ('2', 'writer')], max_length=16),
        ),
    ]