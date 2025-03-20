import { Component } from '@angular/core';
import { Router, RouterOutlet} from '@angular/router';
import { CityWeatherSearchComponent } from "../city-weather-search/city-weather-search.component";
@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [RouterOutlet, CityWeatherSearchComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

}
