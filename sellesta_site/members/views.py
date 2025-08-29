from django.template import loader
from django.http import HttpResponse

def members(request):
    template = loader.get_template('first_page.html')
    return HttpResponse(template.render())