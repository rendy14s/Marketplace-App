import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPaymentPage } from './detail-payment';

@NgModule({
  declarations: [
    DetailPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPaymentPage),
    TranslateModule.forChild()
  ],
  exports: [
    DetailPaymentPage
  ]
})
export class DetailPaymentPageModule {}
