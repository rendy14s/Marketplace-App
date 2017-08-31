import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryDetailOrder } from './delivery-detail-order';

@NgModule({
  declarations: [
    DeliveryDetailOrder,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryDetailOrder),
    TranslateModule.forChild()
  ],
  exports: [
    DeliveryDetailOrder
  ]
})
export class DeliveryDetailOrderModule {}
