from rest_framework import serializers
from ProxyAPI.models import Storage

class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ('StorageId',
                  'StorageName',
                  'StorageType',
                  'StorageHostname',
                  'StorageUsername',
                  'StoragePassword',
                  'StoragePort')