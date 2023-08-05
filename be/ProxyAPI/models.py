from django.db import models

# Create your models here.

class Storage(models.Model):
    StorageId = models.AutoField(primary_key=True)
    StorageName = models.CharField(max_length=100)
    StorageType = models.CharField(max_length=100)
    StorageHostname = models.CharField(max_length=100)
    StorageUsername = models.CharField(max_length=100)
    StoragePassword = models.CharField(max_length=255)
    StoragePort = models.IntegerField()