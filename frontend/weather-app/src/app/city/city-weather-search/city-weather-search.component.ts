import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-weather-search',
  standalone: true,
  imports: [],
  templateUrl: './city-weather-search.component.html',
  styleUrl: './city-weather-search.component.css'
})

export class CityWeatherSearchComponent implements OnInit {

  private autoComplete : any;
  private place: any;
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
        this.autoComplete.addListener("place_changed", () => {
          this.place = this.autoComplete.getPlace();
          console.log("Place selected", this.place);
        });
      } else {
        console.error("Element with ID 'autoComplete' not found");
      }
    }).catch(error => {
      console.error("Error loading Google Maps Places API", error);
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSearch() {
  }
}
