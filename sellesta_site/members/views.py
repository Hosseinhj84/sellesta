from django.template import loader
from django.http import HttpResponse
from .models import Member
from rest_framework import generics , permissions
from django.contrib.auth.models import User
from .serilaizers import RegisterSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

def members(request):
    mymembers = Member.objects.all().values()
    template = loader.get_template('all_members.html')
    context = {
        'mymembers' : mymembers,
    }
    return HttpResponse(template.render(context , request))

def details(request , id):
    mymembers = Member.objects.get(id = id)
    template = loader.get_template('details.html')
    context = {
        'mymembers' : mymembers,
    }
    return HttpResponse(template.render(context , request))

def main(request):
    template = loader.get_template('main.html')
    return HttpResponse(template.render())