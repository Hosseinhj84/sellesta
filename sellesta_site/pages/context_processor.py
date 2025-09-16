from .models import Pages

def pages_context(request):
    return {
        "pages" : Pages.objects.all()
    }