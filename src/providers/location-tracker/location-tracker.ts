import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationTrackerProvider {

 public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  
  constructor(
	public backgroundGeolocation: BackgroundGeolocation,
	public geolocation: Geolocation,
	public http: HttpClient,
	public zone: NgZone) {
    console.log('Hello LocationTrackerProvider Provider');
  }


}
