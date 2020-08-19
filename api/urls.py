from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import (RepositoryView,RepositoryViewView)

router = DefaultRouter() #API routing
router.register('repositories/new',RepositoryView,basename='new_repository')
router.register('repositories/view',RepositoryViewView,basename='view_repository')

urlpatterns = [
    path('',include(router.urls)),
]
