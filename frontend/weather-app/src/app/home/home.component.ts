import { Component } from '@angular/core';
import { CityWeatherSearchComponent } from "../city-weather-search/city-weather-search.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CityWeatherSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
