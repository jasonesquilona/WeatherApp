import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { CityService } from '../services/city.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CurrentWeatherComponent } from "../current-weather/current-weather.component";
import { TodayForecastComponent } from "../today-forecast/today-forecast.component";

@Component({
  selector: 'app-today-weather',
  standalone: true,
  imports: [CommonModule, MatCardModule, CurrentWeatherComponent, TodayForecastComponent],
  templateUrl: './today-weather.component.html',
  styleUrl: './today-weather.component.css'
})
export class TodayWeatherComponent implements OnInit {

  data :any
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
        console.log("Weather Data", this.data);
      },
      error: (error) => {
        console.error("Error fetching weather data", error);
        this.cdr.detectChanges();
      }
    }
    )
  }

}
