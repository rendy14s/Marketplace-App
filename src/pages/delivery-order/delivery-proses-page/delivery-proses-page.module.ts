import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryProsesPage } from './delivery-proses-page';

@NgModule({
  declarations: [
    DeliveryProsesPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryProsesPage),
    TranslateModule.forChild()
  ],
  exports: [
    DeliveryProsesPage
  ]
})
export class DeliveryProsesPageModule {}
