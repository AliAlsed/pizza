import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { PanelPage } from '../panel/panel';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { RequistPage } from '../requist/requist';
import { RegisterPage } from '../register/register';
import { OneSignal } from '@ionic-native/onesignal';
import * as $ from 'jquery'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  list : Observable<any>;
  admin = false;
  email;
  murl = "https";

  constructor(public navCtrl: NavController, public auth : AngularFireAuth,
    public alert : AlertController,public db : AngularFireDatabase,public oneSignal: OneSignal) {

      this.list = db.list("fods").valueChanges();

      db.list("fods").valueChanges().subscribe(data => {
       
        $(".waiteloading").hide();

        if(data[0] == undefined){
          $(".notfoundheader").css("display","flex");
        }

        if(data[0] != undefined){
          $(".notfoundheader").hide();
        }

      })

      auth.authState.subscribe(user => {
        if(user != undefined){
          if(user.email == "admin@admin.com"){
            this.admin = true
          }
        }
      })

      this.checkNote();
      this.mynote();
      this.adminnote();
      

  }

  ngOnInit(){
    var winh = $(window).height();
    var navh = $(".tabs-md .tab-button").innerHeight();
  
    $(".waiteloading,.notfoundheader").height(winh - (navh + navh) );
  
    }

  mynote(){
    this.oneSignal.startInit('e2de86a3-f6de-41d7-b722-31bb510f92dd', '493300855944');

this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);


this.oneSignal.endInit();
  }

  
  checkNote(){
    this.auth.authState.subscribe(user => {
      if(user != undefined){
        if(user.email != "admin@admin.com"){

          this.oneSignal.getIds().then( id => {
            this.db.list("ids",ref => ref.orderByChild("id").equalTo(id.userId)).valueChanges().subscribe( mdata => {
             if(mdata[0] == undefined){
               this.db.list("ids").push({
                 id:id.userId,
                 email:this.auth.auth.currentUser.email
               })
             }
            });
            });

        }
      }
    })
  }

  adminnote(){
    this.auth.authState.subscribe(user => {
      if(user != undefined){
        if(user.email == "admin@admin.com"){

          this.oneSignal.getIds().then( id => {
            this.db.list("adminid",ref => ref.orderByChild("id").equalTo(id.userId)).valueChanges().subscribe( mdata => {
             if(mdata[0] == undefined){
               this.db.list("adminid").push({
                 id:id.userId,
                 email:this.auth.auth.currentUser.email
               })
             }
            });
            });

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
