from django.contrib import admin
from .models import Pages

# Register your models here.
@admin.register(Pages)
class PageAdmin(admin.ModelAdmin):
    list_display = ("title" , "slug" , "url")
    prepopulated_fields = {"slug": ("title",)}
    
    def url(self, obj):
        return obj.redirect_url or obj.get_absolute_url()
