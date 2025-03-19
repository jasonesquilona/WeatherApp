from django.shortcuts import render
from django.shortcuts import render, HttpResponseRedirect
from django.http import HttpResponse, JsonResponse

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_data(request):
    return JsonResponse({'data': 'Hello World'})