import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegisterPage } from '../pages/register/register';
import { OneSignal } from '@ionic-native/onesignal';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public auth : AngularFireAuth,public oneSignal: OneSignal,public db : AngularFireDatabase) {

      auth.authState.subscribe(user => {
        if(user == undefined){
          this.rootPage = RegisterPage
        }
      })
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      

  
      this.oneSignal.startInit('APP_KEY', 'SENDER_ID');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      
      this.oneSignal.endInit();

         this.mynote();

    });
  }


  mynote(){



this.auth.authState.subscribe(user => {
  if(user != undefined){

      this.oneSignal.getIds().then( id => {
       var sub = this.db.list("ids",ref => ref.orderByChild("id").equalTo(id.userId)).valueChanges().subscribe( mdata => {
         if(mdata[0] == undefined){
           this.db.list("ids").push({
             id:id.userId,
             email:this.auth.auth.currentUser.email
           }).then( ()=> {
             sub.unsubscribe();
           })
         }
        });
        });

  }
})



  }

}
