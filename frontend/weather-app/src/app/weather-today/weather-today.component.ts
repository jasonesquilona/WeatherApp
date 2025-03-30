import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-weather-today',
  standalone: true,
  imports: [MatCardModule,MatGridListModule],
  templateUrl: './weather-today.component.html',
  styleUrl: './weather-today.component.css'
})
export class WeatherTodayComponent {
    @Input() weatherData: any;
    private isViewInitialized: boolean = false;
  
    constructor(private cdr: ChangeDetectorRef){
      
    }
  
    ngOnChanges(changes:SimpleChanges){
      if(changes['weatherData'] && changes['weatherData'].currentValue){
        this.cdr.detectChanges();
        this.updateViewIfReady();
      }
    }


    ngAfterViewInit() {
      this.isViewInitialized = true;
      this.updateViewIfReady();
    }
  
    private UpdateView(weather_data:any) {
      const location = weather_data.location;
      const current = weather_data.current;
      const astro = weather_data.astro;
      const forecast = weather_data.forecast;
      this.updateMainContainer(current, location,  astro, forecast);
    }
  
    private updateViewIfReady() {
      if (this.isViewInitialized && this.weatherData) {
        this.UpdateView(this.weatherData['weather_data']);
      }
    }
   
    private updateMainContainer(current: any, location: any, astro: any, forecast:any) {
        const weatherTodayTitle = document.getElementById("weatherTodayTitle");
        const sunriseField = document.getElementById("sunriseField");
        const sunsetField = document.getElementById("sunsetField");
        const feelsLikeField = document.getElementById("feelsLikeField");
        const highLowField = document.getElementById("highLowField");
        const humidityField = document.getElementById("humidityField");
        const pressureField = document.getElementById("pressureField");
        const visibilityField = document.getElementById("visibilityField");
        const windField = document.getElementById("windField");
        const dewPointField = document.getElementById("dewPointField");
        const moonPhaseField = document.getElementById("moonPhaseField");
        if(weatherTodayTitle && sunriseField && sunsetField && feelsLikeField && highLowField && humidityField 
          && pressureField && visibilityField && windField && dewPointField && moonPhaseField){
            weatherTodayTitle.textContent = "Weather Today in " + location.name + ", " + location.region + ", " + location.country;
            sunriseField.textContent = "Sunrise: " + astro.sunrise;
            sunsetField.textContent = "Sunset: " + astro.sunset;
            feelsLikeField.textContent = "Feels Like: " + current.feels_like + "°C";
            highLowField.textContent = "High:" + forecast[0].day.maxtemp_c + "°C / " + "Low:" + forecast[0].day.mintemp_c
            humidityField.textContent = "Humidity: " + current.humidity + "%";
            pressureField.textContent = "Pressure: " + current.pressure +" mb";
            visibilityField.textContent = "Visibility: " + current.visibility + " km";
            windField.textContent = "Wind: " + current.wind_speed + " km/h " + current.wind_dir;
            dewPointField.textContent = "Dew Point: " + current.dewpoint + "°C";
            moonPhaseField.textContent = "Moon Phase: " + astro.moon_phase;
          }
    }

}
