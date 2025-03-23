import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-today-weather',
  standalone: true,
  imports: [],
  templateUrl: './today-weather.component.html',
  styleUrl: './today-weather.component.css'
})
export class TodayWeatherComponent implements OnInit {

  private data :any

  constructor(private activatedRoute: ActivatedRoute, private service: CityService) {
  }

  ngOnInit() {
    console.log('ngOnInit triggered');
    const city = this.activatedRoute.snapshot.queryParamMap.get('city');
    const lat = this.activatedRoute.snapshot.queryParamMap.get('lat');
    const lon = this.activatedRoute.snapshot.queryParamMap.get('lon');
    const version = 'today'
    this.service.getData({city, lat, lon,version}).subscribe({
      next: (data : any) => {
        this.data = data;
        //console.log("Weather Data", this.data);
      },
      error: (error) => {
        console.error("Error fetching weather data", error);
      }
    }
    )
  }

}
