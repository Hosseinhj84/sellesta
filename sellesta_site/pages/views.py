from django.shortcuts import render,get_object_or_404
from .models import Pages , HeaderLinks
from sellesta_site.permissions import IsAdminOrReadOnly
from rest_framework import permissions , viewsets
from .serializers import HeaderLinksSerializers , PageSerializer
# Create your views here.

class HeaderLinkViewSet(viewsets.ModelViewSet):
    queryset = HeaderLinks.objects.all()
    serializer_class = HeaderLinksSerializers
    permission_classes = [IsAdminOrReadOnly]

class PageViewSet(viewsets.ModelViewSet):
    queryset = Pages.objects.all()
    serializer_class = PageSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "slug"