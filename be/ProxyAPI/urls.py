from django.urls import path
from . import views
urlpatterns = [
    path('quotas/', views.process_quota_request),
    path('storage/', views.process_storage_request),
]