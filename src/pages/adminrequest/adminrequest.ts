import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

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
    public platform : Platform,public alert : AlertController) {

      platform.ready().then( ()=> {
        this.loadmap();
      });

    this.list = db.list("request").snapshotChanges();

    

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

  arrivedDone(key){
    var alert= this.alert.create({
      subTitle:"هل انت متأكد انه تم توصيل الطلب؟",
      cssClass:"setdire",
      buttons:[{text:"تأكيد",handler: ()=> {
        this.db.list("request").update(key,{
          arrived:true
         })
      }},"الغاء"]
    })
    alert.present();
  }

}
