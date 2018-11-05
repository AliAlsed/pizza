import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {


  list : Observable<any>;

  constructor(public navCtrl: NavController,
    public db : AngularFireDatabase, public auth : AngularFireAuth) {

    this.list = db.list("request",ref =>ref.orderByChild("email").equalTo(auth.auth.currentUser.email)).valueChanges();


  }

}
