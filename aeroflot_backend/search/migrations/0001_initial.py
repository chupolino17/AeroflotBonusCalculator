# Generated by Django 4.2.19 on 2025-03-04 10:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SearchCache',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime_from', models.DateTimeField()),
                ('datetime_to', models.DateTimeField()),
                ('code_from', models.CharField(max_length=3)),
                ('code_to', models.CharField(max_length=3)),
                ('price', models.IntegerField()),
                ('fare', models.CharField(max_length=10)),
                ('legs', models.JSONField()),
                ('fetch_time', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
    ]
