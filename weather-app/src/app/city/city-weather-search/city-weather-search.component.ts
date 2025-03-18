import { Component } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-city-weather-search',
  standalone: true,
  imports: [],
  templateUrl: './city-weather-search.component.html',
  styleUrl: './city-weather-search.component.css'
})

export class CityWeatherSearchComponent {

  private autoComplete : any;
  private loader = new Loader({
    apiKey: import.meta.env.NG_APP_GOOGLEMAPS_API_KEY,
    version: "weekly",
  });

  constructor() {
    this.loader.importLibrary('places').then(() => {
      console.log("Google Maps Places API loaded");
      const autoCompleteElement = document.getElementById("autocomplete");
      if (autoCompleteElement) {
        this.autoComplete = new google.maps.places.Autocomplete(autoCompleteElement as HTMLInputElement, {
          types: ["(cities)"],
          fields: ["name", "geometry", "place_id"],
        });
      } else {
        console.error("Element with ID 'autoComplete' not found");
      }
    }).catch(error => {
      console.error("Error loading Google Maps Places API", error);
    });
  }

  onSearch() {
  }
}
