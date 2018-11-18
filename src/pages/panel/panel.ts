import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddfodPage } from '../addfod/addfod';
import { AdminrequestPage } from '../adminrequest/adminrequest';
import { MenufoodPage } from '../menufood/menufood';
import { NotificationPage } from '../notification/notification';

/**
 * Generated class for the PanelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-panel',
  templateUrl: 'panel.html',
})
export class PanelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PanelPage');
  }


  addfod(){
    this.navCtrl.push(AddfodPage);
  }

  requests(){
    this.navCtrl.push(AdminrequestPage);
  }

  fodmenu(){
    this.navCtrl.push(MenufoodPage)
  }

  noti(){
    this.navCtrl.push(NotificationPage);
  }

}
