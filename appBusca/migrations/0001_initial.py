# Generated by Django 5.1 on 2024-09-09 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome_item', models.CharField(max_length=255)),
                ('comp_ativ_itm', models.CharField(max_length=255)),
            ],
        ),
    ]