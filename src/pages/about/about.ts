import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as $ from 'jquery'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {


  list : Observable<any>;
  notfound = false;

  constructor(public navCtrl: NavController,
    public db : AngularFireDatabase, public auth : AngularFireAuth) {

    this.list = db.list("request",ref =>ref.orderByChild("email").equalTo(auth.auth.currentUser.email)).valueChanges();

    db.list("request",ref =>ref.orderByChild("email").equalTo(auth.auth.currentUser.email)).valueChanges().subscribe(user => {

      $("page-about .waiteloading").hide();

      if(user[0] == undefined){
        $("page-about .notfoundheader").css("display","flex");
      }

      if(user[0] != undefined){
        $("page-about .notfoundheader").hide();
      }

    })

  }

  ngOnInit(){
    var winh = $(window).height();
    var navh = $(".tabs-md .tab-button").innerHeight();
  
    $(".waiteloading,.notfoundheader").height(winh - (navh + navh) );
  
    }

}
