from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view

from django.http.response import JsonResponse

from .storage import get_quotas, update_quota
from .encrypt_util import encrypt

from ProxyAPI.models import Storage
from ProxyAPI.serializers import StorageSerializer

@api_view(['PATCH', 'GET'])
def process_quota_request(request):
    try:
        if 'StorageId' not in request.query_params.dict():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        StorageId = request.query_params.dict()['StorageId']
        QuotaId = request.query_params.dict()['QuotaId'] if 'QuotaId' in request.query_params.dict() else ''

        if (request.method == 'GET'):    
            response = get_quotas(StorageId, QuotaId)
            if response.ok:
                return Response(response.json())
            return Response(response.text, status=response.status_code)
                
        elif (request.method == 'PATCH'):
            QuotaHardLimit = request.data['QuotaHardLimit'] if 'QuotaHardLimit' in request.data.keys() else ''

            if (not QuotaHardLimit and QuotaId):
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            response = update_quota(StorageId, QuotaId, QuotaHardLimit)

            if response.ok:
                return Response(status=response.status_code)
            return Response(response.text, status=response.status_code)
        else:
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    except Exception as e:
        return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST', 'PATCH', 'GET', 'DELETE'])
def process_storage_request(request):
    try:
        if (request.method == 'GET'):
            if request.query_params:
                items = Storage.objects.filter(**request.query_params.dict())
            else:
                items = Storage.objects.all()
            if items:
                serializer = StorageSerializer(items, many=True)
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        elif (request.method == 'POST'):
            payload = request.data
            if 'StoragePassword' in payload.keys():
                payload['StoragePassword'] = encrypt(payload['StoragePassword'])
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer = StorageSerializer(data=payload)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif (request.method == 'PATCH'):
            if 'StorageId' in request.query_params.dict():
                item = Storage.objects.filter(**request.query_params.dict())
                if item:
                    payload = request.data
                    if 'StoragePassword' in payload.keys():
                        payload['StoragePassword'] = encrypt(payload['StoragePassword'])
                    item.update(**payload)
                    serializer = StorageSerializer(item, many=True)
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        elif (request.method == 'DELETE'):
            if 'StorageId' in request.query_params.dict():
                item = Storage.objects.filter(**request.query_params.dict())
                if item:
                    item.delete()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    except Exception as e:
        return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     