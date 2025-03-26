import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { CityService } from '../services/city.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CurrentWeatherComponent } from "../current-weather/current-weather.component";
import { TodayForecastComponent } from "../today-forecast/today-forecast.component";
import { WeatherTodayComponent } from '../weather-today/weather-today.component';

@Component({
  selector: 'app-today-weather-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, CurrentWeatherComponent, TodayForecastComponent, WeatherTodayComponent],
  templateUrl: './today-weather-page.component.html',
  styleUrl: './today-weather-page.component.css'
})
export class TodayWeatherPageComponent implements OnInit {

  data: any
  public loading: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private service: CityService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.fetchWeatherData();
  }

  fetchWeatherData(){
    const city = this.activatedRoute.snapshot.queryParamMap.get('city');
    const lat = this.activatedRoute.snapshot.queryParamMap.get('lat');
    const lon = this.activatedRoute.snapshot.queryParamMap.get('lon');
    const version = 'today'
    this.service.getData({city, lat, lon,version}).subscribe({
      next: (data : any) => {
        this.data = data;
        console.log(data);
        this.loading = false;
        console.log("loading", this.loading);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error fetching weather data", error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    }
    )
  }

}
