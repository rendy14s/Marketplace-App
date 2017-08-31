import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryOrderApproval } from './delivery-order-approval';

@NgModule({
  declarations: [
    DeliveryOrderApproval,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryOrderApproval),
    TranslateModule.forChild()
  ],
  exports: [
    DeliveryOrderApproval
  ]
})
export class DeliveryOrderApprovalModule {}
