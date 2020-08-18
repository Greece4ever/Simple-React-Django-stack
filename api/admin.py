from django.contrib import admin

# Register your models here.

from .models import source_file,repository

admin.site.register(repository)
admin.site.register(source_file)