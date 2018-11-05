import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as $ from 'jquery'
import { AngularFireDatabase } from '@angular/fire/database';

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
    public db : AngularFireDatabase, public toast : ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddfodPage');
    var navh = $(".header").innerHeight();
    console.log(navh);
  }


    
  ngOnInit(){
    var winh = $(window).height();
    var tabmd = $(".tabs-md .tab-button").innerHeight();
    console.log(tabmd);

    $("page-addfod .header-content").height(winh - (tabmd+tabmd));
  
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
          image:"https://cdn.vox-cdn.com/thumbor/JWomuYQiZue5Y6nx5QaaA9Il8ZY=/0x0:798x599/1200x800/filters:focal(0x0:798x599)/cdn.vox-cdn.com/uploads/chorus_image/image/46569362/pizza-hot-dogs.0.0.jpg",
          date: d.getFullYear() + "/" + d.getDate() + "/" + monthNames[d.getMonth()],
        }).then( done => {
          var toast = this.toast.create({
            message:"تم نشر الاكلة",
            duration:3000,
            cssClass:"setdire"
          }).present();
          this.navCtrl.popToRoot();
        })

      }

    }

}
