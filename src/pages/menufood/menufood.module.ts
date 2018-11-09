import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenufoodPage } from './menufood';

@NgModule({
  declarations: [
    MenufoodPage,
  ],
  imports: [
    IonicPageModule.forChild(MenufoodPage),
  ],
})
export class MenufoodPageModule {}
