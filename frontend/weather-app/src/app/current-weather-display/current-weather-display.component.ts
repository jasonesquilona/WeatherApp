import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-current-weather-display',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './current-weather-display.component.html',
  styleUrl: './current-weather-display.component.css'
})
export class CurrentWeatherDisplayComponent implements OnChanges{

  @Input() weatherData: any;
  private isViewInitialized: boolean = false;

  constructor(private cdr: ChangeDetectorRef){
    
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['weatherData'] && changes['weatherData'].currentValue){
      console.log(this.weatherData['weather_data']);
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
    console.log("Testing Update");
    console.log(location);
    console.log(current);
    console.log(forecast);
    this.updateMainContainer(current, location, forecast);
  }

  private updateViewIfReady() {
    if (this.isViewInitialized && this.weatherData) {
      this.UpdateView(this.weatherData['weather_data']);
    }
  }
 
  private updateMainContainer(current: any, location: any, forecast:any) {
    const mainCardTitle = document.getElementById('mainCardTitle');
    const mainCardSubTitle = document.getElementById('mainCardSubTitle');
    const mainTemperature = document.getElementById('mainTemperature');
    const mainCondition = document.getElementById('mainCondition');
    const mainHighlow = document.getElementById('mainHighlow');
    if (mainCardTitle && mainCardSubTitle && mainTemperature && mainCondition && mainHighlow) {
      mainCardTitle.textContent = location.name + ', ' + location.region + ', ' + location.country;
      mainCardSubTitle.textContent = "as of " + current.last_updated;
      mainTemperature.textContent = current.temp_c + '°C';
      mainCondition.textContent = current.condition;
      for (const day of forecast) {
        if(this.isSameDay(day.date, current.last_updated)) {
          mainHighlow.textContent = 'H: ' + day.day.maxtemp_c + '°C / L: ' + day.day.mintemp_c + '°C';
          break;
        } 
      }
    } 
      else {
        console.error("Element with ID 'mainDisplay' not found");
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

