import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListTopupPage } from './list-topup';

@NgModule({
  declarations: [
    ListTopupPage,
  ],
  imports: [
    IonicPageModule.forChild(ListTopupPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListTopupPage
  ]
})
export class ListTopupPageModule {}
