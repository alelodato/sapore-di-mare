# Generated by Django 4.2.17 on 2025-01-08 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0005_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='table',
            name='customer',
            field=models.TextField(default='customer full name', max_length=50),
        ),
        migrations.AddField(
            model_name='table',
            name='date',
            field=models.DateField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='table',
            name='time',
            field=models.TimeField(auto_now=True),
        ),
    ]
