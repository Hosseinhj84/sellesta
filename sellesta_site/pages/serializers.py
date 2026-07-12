from rest_framework import serializers
from .models import HeaderLinks

class HeaderLinksSerializers(serializers.ModelSerializer):
    class Meta:
        model = HeaderLinks
        fields = ["id" , "title" , "url" , "order"]