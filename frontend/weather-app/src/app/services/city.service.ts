import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseURL = import.meta.env.NG_APP_API_BASE_URL;
  constructor(private httpClient: HttpClient) { }

  getData(params: { city: string | null, lat: string | null, lon: string | null }):Observable<any>{ 
    console.log("City", params.city);
    console.log("Lat",  params.lat);
    console.log("Lon",  params.lon);
    let httpParams = new HttpParams();
    if (params.city) { 
      httpParams = httpParams.set('city', params.city);
    }
    if (params.lat) {
      httpParams = httpParams.set('lat', params.lat);
    }
    if(params.lon){
      httpParams = httpParams.set('lon', params.lon);
    }
    console.log(this.baseURL);
    console.log(httpParams);
    return this.httpClient.get<any>(this.baseURL, {params: httpParams});
  }
}
