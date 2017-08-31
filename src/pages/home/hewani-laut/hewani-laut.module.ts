import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HewaniLautPage } from './hewani-laut';

@NgModule({
  declarations: [
    HewaniLautPage,
  ],
  imports: [
    IonicPageModule.forChild(HewaniLautPage),
    TranslateModule.forChild()
  ],
  exports: [
    HewaniLautPage
  ]
})
export class HewaniLautPageModule {}
