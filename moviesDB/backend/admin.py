from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.User)
admin.site.register(models.Tag)
admin.site.register(models.Title)
admin.site.register(models.Review)
admin.site.register(models.Watchlist)