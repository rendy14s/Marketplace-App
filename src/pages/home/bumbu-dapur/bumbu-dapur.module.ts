import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BumbuDapurPage } from './bumbu-dapur';

@NgModule({
  declarations: [
    BumbuDapurPage,
  ],
  imports: [
    IonicPageModule.forChild(BumbuDapurPage),
    TranslateModule.forChild()
  ],
  exports: [
    BumbuDapurPage
  ]
})
export class BumbuDapurPageModule {}
