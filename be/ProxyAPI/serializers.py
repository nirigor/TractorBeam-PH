from rest_framework import serializers
from ProxyAPI.models import Storage, Quota

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

class QuotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quota
        fields = '__all__'