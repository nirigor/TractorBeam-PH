import yaml
from .dellstorage import powerscale
from .encrypt_util import decrypt
from .models import Storage, Quota
from django.conf import settings

with open(f'{settings.BASE_DIR}/defaults.yml', 'r') as fh:
    defaults = yaml.safe_load(fh)

params = { "zone" : defaults['ZONE'] }
bytes_in_GiB = 1073741824

class powerscale(powerscale):
    def call(self, method, path, payload={}, params={}):
        response = super().call(method, path, payload, params)
        if (response.status_code == 204):
            return { 'ok' : response.ok, 'data' : [] }
        data = response.json()
        main_key = list(data.keys())[0]
        while 'resume' in response.json().keys() and response.json()['resume']:
            params = { 'resume' : response.json()['resume'] }
            response = super().call(method, path, payload, params)
            data[main_key].extend(response.json()[main_key])
        return { 'ok' : response.ok, 'data' : data }

    def get_quotas(self, QuotaId):
        return self.call('GET', f'/quota/quotas/{QuotaId}', params=params)

    def update_quota(self, QuotaId, QuotaHardLimit):        
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
        if response['ok']:
            data = []
            for quota in response['data']['quotas']:
                data.append(Quota(StorageId=StorageId, 
                                  QuotaId=quota['id'], 
                                  QuotaPath=quota['path'], 
                                  QuotaUsed=quota['usage']['fslogical'], 
                                  QuotaHard=quota['thresholds']['hard']))
            response['data'] = data
        stg.close()
    return response

def update_quota(StorageId, QuotaId, QuotaHardLimit):
    array = Storage.objects.get(StorageId=StorageId)
    if (array.StorageType == 'PowerScale'):     
        stg = powerscale(array.StorageHostname, array.StorageUsername, decrypt(array.StoragePassword))
        response = stg.update_quota(QuotaId, QuotaHardLimit)
        stg.close()
    return response
    


    