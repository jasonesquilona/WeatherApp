import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-weather-today',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './weather-today.component.html',
  styleUrl: './weather-today.component.css'
})
export class WeatherTodayComponent {
    @Input() weatherData: any;
    private isViewInitialized: boolean = false;
  
    constructor(private cdr: ChangeDetectorRef){
      
    }
  
    ngOnChanges(changes:SimpleChanges){
      if(changes['weatherData'] && changes['weatherData'].currentValue){
        this.cdr.detectChanges();
        this.updateViewIfReady();
      }
    }


    ngAfterViewInit() {
      this.isViewInitialized = true;
      this.updateViewIfReady();
    }
  
    private UpdateView(weather_data:any) {
      const location = weather_data.location;
      const current = weather_data.current;
      const astro = weather_data.astro;
      this.updateMainContainer(current, location,  astro);
    }
  
    private updateViewIfReady() {
      if (this.isViewInitialized && this.weatherData) {
        this.UpdateView(this.weatherData['weather_data']);
      }
    }
   
    private updateMainContainer(current: any, location: any, astro: any) {
    }

}
