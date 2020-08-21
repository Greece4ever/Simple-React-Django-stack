from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import (RepositoryView,RepositoryViewView,SourceFileView,UploadFile,ListRepository,checkAuthentication,UserCreation)

router = DefaultRouter() #API routing
router.register('repositories/new',RepositoryView,basename='new_repository')
router.register('repositories/view',RepositoryViewView,basename='view_repository')
router.register('files/new',SourceFileView,basename='new_file')
router.register('files/create',UploadFile,basename='file_new')
router.register('repositories/list',ListRepository,basename="list_repository")
router.register("accounts/ViewOrCreate",UserCreation,basename="user_checkOrcreate")
router.register("accounts/is_authenticated",checkAuthentication,basename='is_authenticated_view')


urlpatterns = [
    path('',include(router.urls)),
]
