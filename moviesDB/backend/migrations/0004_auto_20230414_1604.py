# Generated by Django 3.2.9 on 2023-04-14 11:04

from decimal import Decimal
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_auto_20230414_1517'),
    ]

    operations = [
        migrations.AddField(
            model_name='title',
            name='total_rating',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=2, validators=[django.core.validators.MinValueValidator(Decimal('0.0')), django.core.validators.MaxValueValidator(Decimal('5.0'))]),
        ),
        migrations.AlterField(
            model_name='rating',
            name='value',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)]),
        ),
    ]
