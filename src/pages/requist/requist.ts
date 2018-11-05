import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import * as $ from 'jquery'
import { AboutPage } from '../about/about';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the RequistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requist',
  templateUrl: 'requist.html',
})
export class RequistPage {

  name;
  des;
  price;
  email;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db : AngularFireDatabase, public load : LoadingController,
    public toast : ToastController,public geolocation : Geolocation,
    public auth : AngularFireAuth, public alert : AlertController) {

    this.name = navParams.get("name");
    this.des = navParams.get("des");
    this.price = navParams.get("price");

    this.email = auth.auth.currentUser.email;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequistPage');
  }


  request(name,des,price,username,addr,phone){

    var d = new Date();

    const monthNames = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];

  
    var char = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v"];
    var rand1 = Math.floor(Math.random() * char.length);
    var rand2 = Math.floor(Math.random() * char.length);
    var rand3 = Math.floor(Math.random() * char.length);
    var rand4 = Math.floor(Math.random() * char.length);
    var rand5 = Math.floor(Math.random() * char.length);
    var rand = char[rand1] + char[rand2] + char[rand3] + char[rand4] + char[rand5];

   if(username.length > 0 && addr.length > 0 && phone.length > 0){

   var alert = this.alert.create({
     subTitle:"هل تريد تأكيد الطلب؟",
     cssClass:"setdire",
     buttons:[
       {text:"تأكيد",handler : ok => {

        this.geolocation.getCurrentPosition().then( pos => {

          var toast = this.toast.create({
            message:"تم ارسال طلبك بنجاح",
            duration:3000,
            cssClass:"setdire"
          })
          
          var load = this.load.create({
            content:"جاري ارسال الطلب",
            cssClass:"setdire"
          });
      
          load.present();
      
          this.db.list("request").push({
            name:name,
            des:des,
            price:price,
            username:username,
            addr:addr,
            phone:phone,
            date: d.getFullYear() + "/" + d.getDate() + "/" + monthNames[d.getMonth()],
            lat:pos.coords.latitude,
            lng:pos.coords.longitude,
            email:this.email,
            map:rand,
            arrived:false
      
          }).then( ()=> {
            load.dismiss();
            $("input").val("");
            toast.present();
            this.navCtrl.setRoot(AboutPage);
            this.navCtrl.popToRoot();
          })
      
        })

       }}
     ,"الغاء"]
   });

   alert.present();

   }

  }

}
