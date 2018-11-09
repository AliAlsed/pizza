import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import * as $ from 'jquery'
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

/**
 * Generated class for the MenufoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menufood',
  templateUrl: 'menufood.html',
})
export class MenufoodPage {

  list : Observable<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db : AngularFireDatabase, public alert : AlertController,
    public toast : ToastController) {

      this.list = db.list("fods").snapshotChanges();


    db.list("fods").valueChanges().subscribe(data => {
       
      $(".waiteloading").hide();

      if(data[0] == undefined){
        $(".notfoundheader").css("display","flex");
      }

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenufoodPage');
  }

  ngOnInit(){
    var winh = $(window).height();
    var navh = $(".tabs-md .tab-button").innerHeight();
  
    $(".waiteloading,.notfoundheader").height(winh - (navh + navh) );
  
    }

    delete(key){
      

      this.alert.create({
        subTitle:"هل انت متأكد من حذف الاكلة؟",
        cssClass:"setdire",
        buttons:[{text:"حذف",handler: ()=> {
          this.db.list("fods").remove(key).then( OmarReal => {
            this.toast.create({
              message:"تم حذف الاكلة",
              duration:3000,
              cssClass:"setdire"
            }).present();
          } )
        }},"الغاء"]
      }).present();

    }

}