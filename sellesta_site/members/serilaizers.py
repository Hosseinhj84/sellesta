from rest_framework import serializers
from django.contrib.auth.models import User
from.models import Member

class RegisterSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(write_only = True , required=False)
    
    class Meta :
        model = User
        fields = ["id" , "username" , "email" , "password" , "first_name" , "last_name" , "phone"]
        extra_kwargs = {
            "password" : {"write_only" : True},
        }
    
    def create(self, validated_data):
        phone = validated_data.pop("phone", "")
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email" , ""),
            password=validated_data["password"],
            first_name = validated_data.get("first_name" , ""),
            last_name = validated_data.get("last_name" , ""),
        )
        
        Member.objects.create(user=user , phone=phone)
        
        return user