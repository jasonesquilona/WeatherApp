import { Component } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import * as dotenv from 'dotenv'

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
    apiKey: process.env['GOOGLE_MAPS_API_KEY'] as string,
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
