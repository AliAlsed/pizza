import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as $ from 'jquery'
import { AngularFireDatabase } from '@angular/fire/database';
import { OneSignal } from '@ionic-native/onesignal';

/**
 * Generated class for the AddfodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addfod',
  templateUrl: 'addfod.html',
})
export class AddfodPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db : AngularFireDatabase, public toast : ToastController,
    public oneSignal: OneSignal) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddfodPage');
    var navh = $(".header").innerHeight();
    console.log(navh);
  }


    
  ngOnInit(){
 
    }


    addfod(name,price,des){

      var d = new Date();

      const monthNames = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
      ];
      

      if(name.length > 0 && price.length > 0 && des.length > 0){

        this.db.list("fods").push({
          name:name,
          price:price,
          des:des,
          image:"https://www.metro.ca/userfiles/image/recipes/pizza-saucisse-piquante-2301.jpg",
          date: d.getFullYear() + "/" + d.getDate() + "/" + monthNames[d.getMonth()],
        }).then( done => {
          var toast = this.toast.create({
            message:"تم نشر الاكلة",
            duration:3000,
            cssClass:"setdire"
          }).present();
          this.navCtrl.popToRoot();



          this.db.list("ids").valueChanges().subscribe( ids => {

            ids.forEach(id => {
        
        
              this.oneSignal.postNotification({
                app_id:"e2de86a3-f6de-41d7-b722-31bb510f92dd",
                include_player_ids:[id['id']],
                contents: {
                  en: des
                },
                headings: {
                  en: "اكلة جديدة"
                }
              })
      
             
            })
        
          })



          
        })

      }

    }

}
