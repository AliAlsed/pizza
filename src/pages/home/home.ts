import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { PanelPage } from '../panel/panel';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { RequistPage } from '../requist/requist';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  list : Observable<any>;
  admin = false;
  email;

  constructor(public navCtrl: NavController, public auth : AngularFireAuth,
    public alert : AlertController,public db : AngularFireDatabase) {

      this.list = db.list("fods").valueChanges();

      auth.authState.subscribe(user => {
        if(user != undefined){
          if(user.email == "admin@admin.com"){
            this.admin = true
          }
        }
      })

  }


  adminlogin(){
    this.auth.authState.subscribe(user => {

      if(user != undefined){
      if(user.email == "admin@admin.com"){
       this.navCtrl.push(PanelPage);
      }
    }

    });
  }

  logout(){
    var alert = this.alert.create({
      subTitle:"هل تريد تسجيل الخروج",
      cssClass:"setdire",
      buttons:[
        {text:"خروج",handler : ()=> {
          this.auth.auth.signOut();
          this.navCtrl.setRoot(RegisterPage);
          this.navCtrl.goToRoot;
        }}
      ,"الغاء"]
    });
    
    alert.present();

  }


  request(name,des,price){
    this.navCtrl.push(RequistPage,{
      name:name,
      des:des,
      price:price
    })
  }

}
