from django.contrib import admin
from django.urls import path,include,re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #ONLY "apiconfig/" and "admin/" are handled by Django
    #Rest is being handled by react router
    path('admin/', admin.site.urls),
    path('apiconfig/',include('api.urls')),
    path('',TemplateView.as_view(template_name="index.html")),
    re_path(r'^(?:.*)/?$',TemplateView.as_view(template_name="index.html"))

]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

