import pandas as pd
from dotenv import load_dotenv
import requests
import os
import json as Json
from datetime import datetime

def callApi(params, version):
    load_dotenv()
    WEATHER_API_URL = os.getenv("WEATHER_API_URL")
    forecasturl = "http://api.weatherapi.com/v1/forecast.json?"
    astrourl = "http://api.weatherapi.com/v1/astronomy.json?"
    API_KEY = "a2ebbe09b9fa4581bf0193257252203"
    forecasturl += "key=" + API_KEY
    astrourl += "key=" + API_KEY
    processed_data = None
    if version == "today":
        forecasturl += "&q=" + params['city'] +"," + params['lat'] + "," + params['lon'] + "&days=3" 
    processed_data = get_forecast(forecasturl)
    if(processed_data ==  None):
        return None
    currentDate = datetime.strptime(processed_data['current']['last_updated'], '%Y-%m-%d %H:%M')
    print(currentDate)
    astrourl += "&q=" + params['city'] +"," + params['lat'] + "," + params['lon'] + "&dt=" + currentDate.strftime('%Y-%m-%d')
    astro_data = get_astro(astrourl)
    if(astro_data == None):
        return None
    processed_data['astro'] = astro_data['astro']
    return processed_data
    
    
def get_forecast(url): 
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
    

def process_forecast(forecast_data):
    current = forecast_data['current']
    forecast = forecast_data['forecast']
    forecastday = forecast['forecastday']

    processed_data = {
        'location': {
            'name': forecast_data['location']['name'],
            'region': forecast_data['location']['region'],
            'country': forecast_data['location']['country'],
        },
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
        morning_conditions = []
        afternoon_conditions = []
        evening_conditions = []
        overnight_conditions = []
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
                morning_conditions.append(hour['condition']['text'])
            elif 12 <= hour_time.hour < 18:
                day_data['afternoon']['hours'].append(hour_data)
                afternoon_temps.append(hour['temp_c'])
                afternoon_conditions.append(hour['condition']['text'])
            elif 18 <= hour_time.hour < 24:
                day_data['evening']['hours'].append(hour_data)
                evening_temps.append(hour['temp_c'])
                evening_conditions.append(hour['condition']['text'])
            else:
                day_data['overnight']['hours'].append(hour_data)
                overnight_temps.append(hour['temp_c'])
                overnight_conditions.append(hour['condition']['text'])
                
        if morning_temps and morning_conditions:
            day_data['morning']['avgtemp_c'] = sum(morning_temps) / len(morning_temps)
            day_data['morning']['condition'] = most_freq(morning_conditions)
        if afternoon_temps:
            day_data['afternoon']['avgtemp_c'] = sum(afternoon_temps) / len(afternoon_temps)
            day_data['afternoon']['condition'] = most_freq(afternoon_conditions)
        if evening_temps:
            day_data['evening']['avgtemp_c'] = sum(evening_temps) / len(evening_temps)
            day_data['evening']['condition'] = most_freq(evening_conditions)
        if overnight_temps:
            day_data['overnight']['avgtemp_c'] = sum(overnight_temps) / len(overnight_temps)
            day_data['overnight']['condition'] = most_freq(overnight_conditions)
        processed_data['forecast'].append(day_data)
    return processed_data 

def get_astro(url):
    try:
        # Make a GET request to the API endpoint using requests.get()
        response = requests.get(url)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            posts = response.json()
            processed_data = process_astro(posts)
            return processed_data
        else:
            print('Error:', response.status_code)
            return None
    except requests.exceptions.RequestException as e:
        # Any NetworkErrors
        print('Error:', e)
        return None
    
def process_astro(astro_data):
    astro = astro_data['astronomy']['astro']
    processed_data = {
        'astro': {
            'sunrise': astro['sunrise'],
            'sunset': astro['sunset'],
            'moon_phase': astro['moon_phase']
        }
    }
    return processed_data
    


def most_freq(lst):
    return max(set(lst), key=lst.count)