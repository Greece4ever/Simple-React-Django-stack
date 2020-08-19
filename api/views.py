#Rest framework responses
from django.shortcuts import render
from rest_framework import viewsets,mixins
from rest_framework.response import  Response

# Database Tables / Serialization
from .serializers import (RepositorySerializer,SourceFileSerializer)
from .models import repository,source_file
from django.contrib.auth.models import User

#Validation
from .validators import maxRepositorySize


#For creating repositories
class RepositoryView(mixins.ListModelMixin,mixins.CreateModelMixin,viewsets.GenericViewSet):
    """For the creation of new repositories"""

    serializer_class = RepositorySerializer
    queryset = repository.objects.all()

    def create(self,request,*args,**kwargs):
        """Handles direct creation of repository (does not include files)"""

        data = request.data
        user = request.user

        #Validate Authentication
        if not user.is_authenticated:
            return Response({"error" : "Failed to Authenticate"})

        #Get Info
        name = data.get("name")
        description = data.get("description")
        private = data.get("private")

        #Verify that the repository does not already exist
        if repository.objects.filter(owner=user).filter(name=name).exists():
            return Response({"error" : "A repository named '{}' already exists in your repositories".format(name)})


        #Validate Crededentials
        try:
            maxRepositorySize(name=name,description= description)
            assert type(private) == bool , 'Type of "private" must be boolean!'
        except Exception as f:
            return Response({"error" : str(f)})

        repo = repository(name=name,description=description,owner=user,public=private)
        repo.save()

        #Returns the response
        return Response({"success" : {
            "name" : repo.name,
            "private" : repo.public,
            "user" : request.user.username,
            "id" : repo.pk 
        }})


    def list(self,request,*args,**kwargs):
        """Simple API Response To see if a repository name"""
        name = request.GET.get('name')
        user = request.user

        #Validate Authentication
        if not user.is_authenticated:
            return Response({"error" : "Failed to Authenticate"})
        
        return Response({"error" if repository.objects.filter(owner=user).filter(name=name).exists() else "success" : True})

class RepositoryViewView(mixins.ListModelMixin,viewsets.GenericViewSet):
    """For viewing the repository"""
    queryset = repository.objects.all()
    serializer_class = RepositorySerializer

    def list(self,request,*args,**kwargs):
        user = request.user

        id = request.GET.get('id')
        user_quer = request.GET.get('user')

        print(f'\n{user_quer}\n{id}')

        if id is None or user_quer is None:
            return Response({"error" : "404 not found"})
        
        try:
            id = int(id)
        except:
            return Response({"error" : "404 not found"})


        user_quer = User.objects.filter(username=user_quer).first()

        #fetch the repository
        repo = repository.objects.filter(owner=user_quer).filter(pk=id)


        #Check if it exists
        if not repo.exists() > 0:
            return Response({"error" : "404 does not exist"})

        repo = repo.first()

        #Check if the repository is public and if it is check if the request.user is the owner
        if not repo.public and repo.owner != user:
            return Response({"error" : "403 invalid permissions"})


        data = {
            "name" : repo.name,
            "description" : repo.description,
            "public" : repo.public,
            "files" : [(file.file,file.size,file.pk) for file in repo.files.all()],
            "date_created" : str(repo.date_created.date())
        }

        return Response(data)


class SourceFileView(mixins.ListModelMixin,mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = SourceFileSerializer
    queryset = source_file.objects.all()

    def create(self,request,*args,**kwargs):
        pass

    def list(self,request,*args,**kwargs):
        #Request User
        user = request.GET.get('user')
        
        #Repository Name and Owner
        repositories = request.GET.get('repository')
        user_quer = request.GET.get('user')

        #fetch the repository
        repo = repository.objects.filter(owner=user_quer).filter(name=repositories)

        #Check if it exists
        if not repo.exists():
            return Response({"error" : "404 does not exist"})

        #Check if the repository is public and if it is check if the request.user is the owner
        if not repo.public and repo.owner != user:
            return Response({"error" : "403 invalid permissions"})

        
