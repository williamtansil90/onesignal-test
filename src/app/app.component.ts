import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Vibration } from '@ionic-native/vibration';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
	platform: Platform, 
	statusBar: StatusBar, 
	splashScreen: SplashScreen,
	public vibration :Vibration
	) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
	  
	  
	var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
	  this.vibration.vibrate(6000);
	  //alert(JSON.stringify(jsonData));
    };

    window["plugins"].OneSignal
      .startInit("aef61526-8ca8-449e-9d66-afd31a263bfd", "sistrack-ug-mandiri")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
	  
	  window["plugins"].OneSignal.getIds(function(res) {
        localStorage.setItem("token",res.userId);
        //navigator.vibrate(3000);
      });
	  
	  
    });
  }
  



}

