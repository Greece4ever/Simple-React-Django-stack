from .models import source_file,repository
from rest_framework import serializers


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = repository
        fields = '__all__'

class SourceFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = source_file
        fields = '__all__'