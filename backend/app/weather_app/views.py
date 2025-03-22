from django.shortcuts import render
from django.shortcuts import render, HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView  
from rest_framework.response import Response  
from rest_framework import status  

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_data(request):
    city = request.GET.get('city')
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    print(f'City: {city}, Latitude: {lat}, Longitude: {lon}')
    data = {
        'city': city,
        'lat': lat,
        'lon': lon,
        'weather': 'sunny'  # Example response
    }
    return JsonResponse(data)


def home(request):
    return HttpResponse("Hello, Django!")