import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TodayWeatherComponent } from './today-weather/today-weather.component';
import { WeatherComponent } from './weather/weather.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'weather/:data', 
    component: WeatherComponent,
    children: [
      {path: '', redirectTo: 'today', pathMatch: 'full'},
      {path: 'today', component: TodayWeatherComponent},
    ]
  },
];
