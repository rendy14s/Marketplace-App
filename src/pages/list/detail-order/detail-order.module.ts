import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailOrder } from './detail-order';

@NgModule({
  declarations: [
    DetailOrder,
  ],
  imports: [
    IonicPageModule.forChild(DetailOrder),
    TranslateModule.forChild()
  ],
  exports: [
    DetailOrder
  ]
})
export class DetailOrderModule {}
