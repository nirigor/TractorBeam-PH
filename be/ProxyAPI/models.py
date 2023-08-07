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

class Quota(models.Model):
    class Meta:
        managed = False
    StorageId = models.IntegerField()
    QuotaId = models.CharField(primary_key=True, max_length=100)
    QuotaPath = models.CharField(max_length=255)
    QuotaType = models.CharField(max_length=10)
    QuotaUsed = models.IntegerField()
    QuotaHard = models.IntegerField()