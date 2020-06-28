from django.contrib import admin
from .models import Report,Level,Messages,Operation,Operation_type
# Register your models here.


admin.site.register(Report)
admin.site.register(Level)
admin.site.register(Operation)
admin.site.register(Messages)
admin.site.register(Operation_type)
