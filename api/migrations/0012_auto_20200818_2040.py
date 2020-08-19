# Generated by Django 3.0.8 on 2020-08-18 17:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0011_auto_20200818_2038'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='repository',
            name='user',
        ),
        migrations.AddField(
            model_name='repository',
            name='owner',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]