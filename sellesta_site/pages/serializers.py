from rest_framework import serializers
from .models import HeaderLinks
from .models import Pages

class HeaderLinksSerializers(serializers.ModelSerializer):
    class Meta:
        model = HeaderLinks
        fields = ["id" , "title" , "url" , "order" , "is_active"]

class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pages
        fields = ["id" , "title" , "slug" , "content" , "updated"]

