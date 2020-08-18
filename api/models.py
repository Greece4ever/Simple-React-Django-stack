from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from .validators import max_file_size
from django.conf import settings
import  os


# Create your models here.

def user_directory_path(instance, filename):
    #external_root/users/<user:pk>/repositories/<repository:id>/<source_file:file>
    return 'source-files/users/{}/repositories/{}/{}'.format(instance.creator.id,instance.parent_repository,instance.file)

class SourceFileQueryset(models.QuerySet):

    def delete(self,*args,**kwargs):
        for file in self:
            file.file.delete()
        super(SourceFileQueryset, self).delete(*args, **kwargs)

class source_file(models.Model):
    objects = SourceFileQueryset.as_manager()
    creator = models.ForeignKey(User,on_delete=models.CASCADE)
    file = models.FileField(upload_to=user_directory_path,validators=[max_file_size])
    date_uploaded = models.DateTimeField(default=timezone.now)
    parent_repository = models.ForeignKey(to='repository',on_delete=models.CASCADE,default=None)

    def __str__(self):
        return f'{self.file}'

    def delete(self,*args,**kwargs):
        file_path = os.path.join(settings.MEDIA_ROOT,self.file)
        print(f'Removing file {file_path}')
        os.remove(file_path)
        super(source_file,self).delete(*args,**kwargs)

class repository(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500,blank=True)
    files = models.ManyToManyField(source_file,related_name='source_files',blank=True)
    owner = models.ForeignKey(User,related_name='owner',on_delete=models.CASCADE)
    public = models.BooleanField()

    def __str__(self):
        return f'{self.name}'

