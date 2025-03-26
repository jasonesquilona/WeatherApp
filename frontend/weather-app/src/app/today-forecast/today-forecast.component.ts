import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-today-forecast',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './today-forecast.component.html',
  styleUrl: './today-forecast.component.css'
})
export class TodayForecastComponent {
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
      const forecast = weather_data.forecast;
      this.updateMainContainer(location,current, forecast);
    }
  
    private updateViewIfReady() {
      if (this.isViewInitialized && this.weatherData) {
        this.UpdateView(this.weatherData['weather_data']);
      }
    }
   
    private updateMainContainer(location: any, current:any, forecast:any) {
      const forecastTitle = document.getElementById("forecastTitle");
      const morningForecast = document.getElementById("morningForecast");
      const afternoonForecast = document.getElementById("afternoonForecast");
      const eveningForecast = document.getElementById("eveningForecast");
      const overnightForecast = document.getElementById("overnightForecast");
      if(forecastTitle && morningForecast && afternoonForecast && eveningForecast && overnightForecast){
        const tomorrow = new Date(current.last_updated);
        tomorrow.setDate(tomorrow.getDate() + 1);
        forecastTitle.textContent = "Today's Forecast for " + location.name + ", " + location.region + ", " + location.country
        for (const day of forecast) {
          if(this.isSameDay(day.date, current.last_updated)) {
            morningForecast.textContent = "Morning " + Math.round(day.morning.avgtemp_c) + '°C ' + day.morning.condition;
            afternoonForecast.textContent = "Afternoon " + Math.round(day.afternoon.avgtemp_c) + '°C ' + day.afternoon.condition
            eveningForecast.textContent = "Evening " + Math.round(day.evening.avgtemp_c) + '°C ' + day.evening.condition
          }
          else if(this.isSameDay(day.date, tomorrow.toString())){
            overnightForecast.textContent = "Overnight " + Math.round(day.overnight.avgtemp_c) + '°C ' + day.overnight.condition
          }
        }
      }
    }
  
    private isSameDay(dateStr1: string, dateStr2: string) {
      dateStr1 = dateStr1 + ' 00:00'
      const date1 = new Date(dateStr1);
      const date2 = new Date(dateStr2);
      return date1.getFullYear() === date2.getFullYear() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getDate() === date2.getDate();
    }
}
