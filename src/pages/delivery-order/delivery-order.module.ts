import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryOrder } from './delivery-order';

@NgModule({
  declarations: [
    DeliveryOrder,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryOrder),
    TranslateModule.forChild()
  ],
  exports: [
    DeliveryOrder
  ]
})
export class DeliveryOrderModule {}
