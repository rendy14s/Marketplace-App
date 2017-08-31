import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryRejectPage } from './delivery-reject-page';

@NgModule({
  declarations: [
    DeliveryRejectPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryRejectPage),
    TranslateModule.forChild()
  ],
  exports: [
    DeliveryRejectPage
  ]
})
export class DeliveryRejectPageModule {}
