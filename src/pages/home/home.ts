import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

import { Vibration } from '@ionic-native/vibration';

 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  
  public token:any;
  
  
  
  constructor(
	public navCtrl: NavController,
	public backgroundGeolocation: BackgroundGeolocation,
	public geolocation: Geolocation,
	public zone: NgZone,
	public vibration :Vibration
	) {
		
		

  }
  

    ionViewDidLoad() {
		
    console.log('ionViewDidLoad ProfilePage');
  }
  
   
  checkToken()
  {
	  this.token = localStorage.getItem("token");
  }
  
    
  startTracking() {
 
 
  // Background Tracking
 
  let config = {
    desiredAccuracy: 0,
    stationaryRadius: 20,
    distanceFilter: 10,
    debug: true,
    interval: 10000
  };
 
  this.backgroundGeolocation.configure(config).subscribe((location) => {
 
    console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
 
    // Run update inside of Angular's zone
    this.zone.run(() => {
      this.lat = location.latitude;
      this.lng = location.longitude;
    });
 
  }, (err) => {
 
    console.log(err);
 
  });
 
  // Turn ON the background-geolocation system.
  this.backgroundGeolocation.start();
 
 
  // Foreground Tracking
 
let options = {
  frequency: 3000,
  enableHighAccuracy: true
};
 
this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
 
  console.log(position);
 
  // Run update inside of Angular's zone
  this.zone.run(() => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  });
 
});


  }
 
  stopTracking() {
 
   console.log('stopTracking');
 
  this.backgroundGeolocation.finish();
  this.watch.unsubscribe();
 
  }
  
  
  
  doVibrate()
  {
	  this.vibration.vibrate(3000);
  }
  
  doVibrate2()
  {
	  this.vibration.vibrate(10000);
  }
  
  
  
 
 

}
