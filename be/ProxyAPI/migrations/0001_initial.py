# Generated by Django 4.2.4 on 2023-08-03 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Storage',
            fields=[
                ('StorageId', models.AutoField(primary_key=True, serialize=False)),
                ('StorageName', models.CharField(max_length=100)),
                ('StorageType', models.CharField(max_length=100)),
                ('StorageHostname', models.CharField(max_length=100)),
                ('StorageUsername', models.CharField(max_length=100)),
                ('StoragePassword', models.CharField(max_length=255)),
                ('StoragePort', models.IntegerField()),
            ],
        ),
    ]
