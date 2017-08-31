import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryWaitingPage } from './delivery-waiting-page';

@NgModule({
  declarations: [
    DeliveryWaitingPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryWaitingPage),
    TranslateModule.forChild()
  ],
  exports: [
    DeliveryWaitingPage
  ]
})
export class DeliveryWaitingPageModule {}
