import CallWeatherAPI

import numpy as np
import pandas as pd

def showMenu():
    menu = [
        "1. Input Longtitude/Latitude",
        "2. Exit",
    ]
    
    for number,item in enumerate(menu,1):
        print(item)
        
def checkLatitude(lat):
    if(lat <= 90 and lat >= -90):
        return True
    else:
        return False

def checkLongitude(long):
    if(long <= 180 and long >= -180):
        return True
    else:
        return False   
    
def getLongLat():
    lat = float(input("Enter latitude\n"))
    long = float(input("Enter longitude\n"))
    if(checkLongitude(long) == False or checkLatitude(lat) == False):
        return
    else:
        params = {
            "latitude" : lat,
            "longitude": long,
            "hourly": "temperature_2m"
        }
        response = CallWeatherAPI.callApi(params)
        getTemperatureResponse(response)
        
def getTemperatureResponse(response):
    hourly = response.Hourly()
    # https://pypi.org/project/openmeteo-requests/
    hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()
    
    hourly_data = {"date": pd.date_range(
        start = pd.to_datetime(hourly.Time(), unit = "s"),
        end = pd.to_datetime(hourly.TimeEnd(), unit = "s"),
        freq = pd.Timedelta(seconds = hourly.Interval()),
	    inclusive = "left"
    )}
    hourly_data["temperature_2m"] = hourly_temperature_2m
    hourly_dataframe_pd = pd.DataFrame(data = hourly_data)
    daily_dataframe_pd = hourly_dataframe_pd.copy(True)
    daily_dataframe_pd['date'] = daily_dataframe_pd['date'].astype("datetime64[ns]").dt.date
    daily_dataframe_pd = daily_dataframe_pd.set_index("date")
    daily_dataframe_pd = daily_dataframe_pd.groupby(daily_dataframe_pd.index).agg(['min', 'max', 'mean'])
    print(daily_dataframe_pd)
    
    
def main():
    selection = True
    while selection:
        showMenu()
        try:
            selection = int(input("Please choose how you would like to find an area temperature.\n"))
            if(selection == 1):
                getLongLat()
            else:
                print("Exiting")
                selection = None
        except ValueError:
            print("Invalid choice. Enter a valid menu number")

if __name__=="__main__":
    main()