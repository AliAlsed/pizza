import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { OneSignal } from '@ionic-native/onesignal';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

var config = {
  apiKey: "AIzaSyAqIpHbM_e7wBMN5ry8twInDpneGBtDWjM",
  authDomain: "pizza-e8577.firebaseapp.com",
  databaseURL: "https://pizza-e8577.firebaseio.com",
  projectId: "pizza-e8577",
  storageBucket: "pizza-e8577.appspot.com",
  messagingSenderId: "493300855944"
};

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PanelPage } from '../pages/panel/panel';
import { AddfodPage } from '../pages/addfod/addfod';
import { RequistPage } from '../pages/requist/requist';

import { Geolocation } from '@ionic-native/geolocation';
import { RegisterPage } from '../pages/register/register';
import { AdminrequestPage } from '../pages/adminrequest/adminrequest';
import { CallNumber } from '@ionic-native/call-number';
import { MenufoodPage } from '../pages/menufood/menufood';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PanelPage,
    AddfodPage,
    RequistPage,
    RegisterPage,
    AdminrequestPage,
    MenufoodPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PanelPage,
    AddfodPage,
    RequistPage,
    RegisterPage,
    AdminrequestPage,
    MenufoodPage
  ],
  providers: [
    StatusBar,
    Geolocation,
    CallNumber,
    SplashScreen,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
