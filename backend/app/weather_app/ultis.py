import pandas as pd
from dotenv import load_dotenv
import requests
import os
import json as Json
from datetime import datetime

def callApi(params, version):
    load_dotenv()
    WEATHER_API_URL = os.getenv("WEATHER_API_URL")
    print(WEATHER_API_URL)
    url = "http://api.weatherapi.com/v1/forecast.json?"
    API_KEY = "a2ebbe09b9fa4581bf0193257252203"
    url += "key=" + API_KEY
    if version == "today":
        url += "&q=" + params['city'] +"," + params['lat'] + "," + params['lon'] + "&days=3"
        
    try:
        # Make a GET request to the API endpoint using requests.get()
        response = requests.get(url)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            posts = response.json()
            processed_data = process_forecast(posts)
            return processed_data
        else:
            print('Error:', response.status_code)
            return None
    except requests.exceptions.RequestException as e:
        # Any NetworkErrors
        print('Error:', e)
        return None
    return response

def process_forecast(forecast_data):
    current = forecast_data['current']
    forecast = forecast_data['forecast']
    forecastday = forecast['forecastday']

    processed_data = {
        'current': {
            'temp_c': current['temp_c'],
            'condition': current['condition']['text'],
            'wind_kph': current['wind_kph'],
            'humidity': current['humidity'],
            'last_updated': current['last_updated']
        },
        'forecast': []
    }

    for day in forecastday:
        day_data = {
            'date': day['date'],
            'day': {
                'maxtemp_c': day['day']['maxtemp_c'],
                'mintemp_c': day['day']['mintemp_c'],
                'avgtemp_c': day['day']['avgtemp_c'],
                'condition': day['day']['condition']['text']
            },
            'morning': {'avgtemp_c': 0, 'condition': '', 'hours': []},
            'afternoon': {'avgtemp_c': 0, 'condition': '', 'hours': []},
            'evening': {'avgtemp_c': 0, 'condition': '', 'hours': []},
            'overnight': {'avgtemp_c': 0, 'condition': '', 'hours': []},
        }
        morning_temps = []
        afternoon_temps = []
        evening_temps = []
        overnight_temps = []
        for hour in day['hour']:
            hour_data = {
                'time': hour['time'],
                'temp_c': hour['temp_c'],
                'condition': hour['condition']['text']
            }
            hour_time = datetime.strptime(hour['time'], '%Y-%m-%d %H:%M')
            if 6 <= hour_time.hour < 12:
                day_data['morning']['hours'].append(hour_data)
                morning_temps.append(hour['temp_c'])
            elif 12 <= hour_time.hour < 18:
                day_data['afternoon']['hours'].append(hour_data)
                afternoon_temps.append(hour['temp_c'])
            elif 18 <= hour_time.hour < 24:
                day_data['evening']['hours'].append(hour_data)
                evening_temps.append(hour['temp_c'])
            else:
                day_data['overnight']['hours'].append(hour_data)
                overnight_temps.append(hour['temp_c'])
                
        if morning_temps:
            day_data['morning']['avgtemp_c'] = sum(morning_temps) / len(morning_temps)
        if afternoon_temps:
            day_data['afternoon']['avgtemp_c'] = sum(afternoon_temps) / len(afternoon_temps)
        if evening_temps:
            day_data['evening']['avgtemp_c'] = sum(evening_temps) / len(evening_temps)
        if overnight_temps:
            day_data['overnight']['avgtemp_c'] = sum(overnight_temps) / len(overnight_temps)
        print(day_data)
        processed_data['forecast'].append(day_data)
    return processed_data

def getTimePeriod(forecastday):
    for hour in forecastday:
        print(hour['time'])
    return