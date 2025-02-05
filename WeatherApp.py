import CallWeatherAPI

def showMenu():
    menu = [
        "1. Input Longtitude/Latitude",
        "2. Exit",
    ]
    
    for number,item in enumerate(menu,1):
        print(item)
        

def main():
    selection = True
    while selection:
        showMenu()
        try:
            selection = int(input("Please choose how you would like to find an area temperature.\n"))
            if(selection == 1):
                print("Input Longitude")
            else:
                print("Exiting")
                selection = None
        except ValueError:
            print("Invalid choice. Enter a valid menu number")
