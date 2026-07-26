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

class MemberProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username" , read_only=True)
    email = serializers.EmailField(source="user.email")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    
    class Meta:
        model = Member
        fields = ["username" , "email" , "first_name" , "last_name" , "phone" , "joined_date"]
    
    def update(self, instance, validated_data):
        user_data = validated_data.pop("user" , {})
        user = instance.user
        
        user.email = user_data.get("email" , user.email)
        user.first_name = user_data.get("first_name" , user.first_name)
        user.last_name = user_data.get("last_name" , user.last_name)
        user.save()
        
        instance.phone = validated_data.get("phone" , instance.phone)
        instance.save()
        return instance