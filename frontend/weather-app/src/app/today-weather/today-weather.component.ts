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
    console.log("City", city);
    console.log("Lat", lat);
    console.log("Lon", lon);
    this.service.getData({city, lat, lon}).subscribe({
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
