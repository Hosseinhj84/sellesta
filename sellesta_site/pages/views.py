from django.shortcuts import render,get_object_or_404
from .models import Pages , HeaderLinks
from rest_framework import permissions , viewsets
from .serializers import HeaderLinksSerializers
# Create your views here.

def page_detail(request, slug):
    page = get_object_or_404(Pages , slug = slug)
    return render(request , "pages/page_detail.html" , {"pages" : page})

class HeaderLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeaderLinks.objects.filter(is_active=True)
    serializer_class = HeaderLinksSerializers
    permission_classes = [permissions.AllowAny]