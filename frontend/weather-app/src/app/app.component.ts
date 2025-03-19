import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityWeatherSearchComponent } from "./city/city-weather-search/city-weather-search.component";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CityWeatherSearchComponent, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app';
}
