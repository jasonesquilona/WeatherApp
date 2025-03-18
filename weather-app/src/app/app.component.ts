import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityWeatherSearchComponent } from "./city/city-weather-search/city-weather-search.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CityWeatherSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app';
}
