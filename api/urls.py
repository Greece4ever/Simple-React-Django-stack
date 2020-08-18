from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import RepositoryView

router = DefaultRouter() #API routing
router.register('repositories/new',RepositoryView,basename='new_repository')

urlpatterns = [
    path('',include(router.urls)),
]
