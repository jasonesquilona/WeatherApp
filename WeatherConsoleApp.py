import CallWeatherAPI

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
    lat = float(input("Enter latitude"))
    long = float(input("Enter longitude"))
    if(checkLongitude(long) == False or checkLatitude(lat) == False):
        return
    else:
        params = {
            "latitude" : lat,
            "longitude": long,
            "hourly": "temperature_2m"
        }
        CallWeatherAPI(params)
        

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
