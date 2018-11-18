import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, AlertController,ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { OneSignal } from '@ionic-native/onesignal';
import * as $ from 'jquery'

import {
  GoogleMap,
  Marker,

} from '@ionic-native/google-maps';

/**
 * Generated class for the AdminrequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adminrequest',
  templateUrl: 'adminrequest.html',
})
export class AdminrequestPage {

  list : Observable<any>;
  map:GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db : AngularFireDatabase,
    public platform : Platform,public alert : AlertController,
    public oneSignal: OneSignal,public toast : ToastController) {

      platform.ready().then( ()=> {
        this.loadmap();
      });

    this.list = db.list("request").snapshotChanges();

    db.list("request").valueChanges().subscribe(user => {

      $("page-adminrequest .waiteloading").hide();

      if(user[0] == undefined){
        $("page-adminrequest .notfoundheader").css("display","flex");
      }

      if(user[0] != undefined){
        $("page-adminrequest .notfoundheader").hide();
      }

    })
    

  }

  ngOnInit(){
    var winh = $(window).height();
    var navh = $(".tabs-md .tab-button").innerHeight();
  
    $("page-adminrequest .waiteloading,page-adminrequest .notfoundheader").height(winh - (navh + navh) );
  
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminrequestPage');
  }

  loadmap(){

     

    
    this.db.list("request").valueChanges().subscribe(mdata => { 

      mdata.forEach(data => {

     var mymap = this.map = new GoogleMap(data['map'],{
        camera: {
          target: {
            lat: data['lat'],
            lng: data['lng']
          },
          zoom: 18,
          tilt: 30
        },
        controls: {
         compass:true,
         zoom:true,
         myLocationButton:true,
         myLocation:true,
         mapToolbar:true,
         indoorPicker:true,
        },
        gestures : {
          scroll:true,
          tilt:true,
          zoom:true,
          rotate:true
        }
        
      });

      mymap.addMarker({
        title: "موقع الشخص",
      icon: "red",
      animation: 'DROP',
      position: {
        lat: data['lat'],
        lng: data['lng']
      }
      }).then((marker: Marker) => {

      }).catch(err => {
        alert(err.message);
      });




    });

  })

  }

  arrivedDone(key,email){
    var alert= this.alert.create({
      subTitle:"هل انت متأكد انه تم توصيل الطلب؟",
      cssClass:"setdire",
      buttons:[{text:"تأكيد",handler: ()=> {
        this.db.list("request").update(key,{
          arrived:true
         })


         
         this.db.list("ids",ref => ref.orderByChild("email").equalTo(email)).valueChanges().subscribe( ids => {

      
            this.oneSignal.postNotification({
              app_id:"e2de86a3-f6de-41d7-b722-31bb510f92dd",
              include_player_ids:[ids[0]['id']],
              contents: {
                en: "تم ايصال الطلب الخاص بك"
              },
              headings: {
                en: "تهانيا"
              }
            })
  
      
        })



      }},"الغاء"]
    })
    alert.present();
  }

  delete(key){
      

    this.alert.create({
      subTitle:"هل انت متأكد من حذف الطلب؟",
      cssClass:"setdire",
      buttons:[{text:"حذف",handler: ()=> {
        this.db.list("request").remove(key).then( OmarReal => {
          this.toast.create({
            message:"تم حذف الطلب",
            duration:3000,
            cssClass:"setdire"
          }).present();
        } )
      }},"الغاء"]
    }).present();

  }

}
