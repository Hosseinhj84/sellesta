from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Member
from django.contrib.auth.models import User
from .serilaizers import RegisterSerializer , MemberProfileSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self , request):
        member , _ = Member.objects.get_or_create(user = request.user)
        serializer = MemberProfileSerializer(member)
        return Response(serializer.data)
    
    def patch(self , request):
        member , _ = Member.objects.get_or_create(user=request.user)
        serializer = MemberProfileSerializer(member , data= request.data , partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)