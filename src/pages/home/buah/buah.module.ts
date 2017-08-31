import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuahPage } from './buah';

@NgModule({
  declarations: [
    BuahPage,
  ],
  imports: [
    IonicPageModule.forChild(BuahPage),
    TranslateModule.forChild()
  ],
  exports: [
    BuahPage
  ]
})
export class BuahPageModule {}
