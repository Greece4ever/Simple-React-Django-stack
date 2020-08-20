from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import (RepositoryView,RepositoryViewView,SourceFileView,UploadFile)

router = DefaultRouter() #API routing
router.register('repositories/new',RepositoryView,basename='new_repository')
router.register('repositories/view',RepositoryViewView,basename='view_repository')
router.register('files/new',SourceFileView,basename='new_file')
router.register('files/create',UploadFile,basename='file_new')


urlpatterns = [
    path('',include(router.urls)),
]
