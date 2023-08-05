import os
import yaml
from .dellstorage import powerscale
from .encrypt_util import decrypt
from .models import Storage
from django.conf import settings

with open(f'{settings.BASE_DIR}/defaults.yml', 'r') as fh:
    defaults = yaml.safe_load(fh)

params = { "zone" : defaults['ZONE'] }

class powerscale(powerscale):
    def get_quotas(self, QuotaId):
        return self.call('GET', f'/quota/quotas/{QuotaId}', params=params)
    
    def update_quota(self, QuotaId, QuotaHardLimit):
        bytes_in_GiB = 1073741824
        payload = {
            "thresholds" : {
                "hard" : QuotaHardLimit * bytes_in_GiB
            }
        }
        return self.call('PUT', f'/quota/quotas/{QuotaId}', payload=payload, params=params)

def get_quotas(StorageId, QuotaId):
    array = Storage.objects.get(StorageId=StorageId)
    if (array.StorageType == 'PowerScale'):
        stg = powerscale(array.StorageHostname, array.StorageUsername, decrypt(array.StoragePassword))
        response = stg.get_quotas(QuotaId)
        stg.close()
    return response

def update_quota(StorageId, QuotaId, QuotaHardLimit):
    array = Storage.objects.get(StorageId=StorageId)
    if (array.StorageType == 'PowerScale'):     
        stg = powerscale(array.StorageHostname, array.StorageUsername, decrypt(array.StoragePassword))
        response = stg.update_quota(QuotaId, QuotaHardLimit)
        stg.close()
    return response
    


    