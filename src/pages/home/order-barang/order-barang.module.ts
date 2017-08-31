import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderBarang } from './order-barang';

@NgModule({
  declarations: [
    OrderBarang,
  ],
  imports: [
    IonicPageModule.forChild(OrderBarang),
    TranslateModule.forChild()
  ],
  exports: [
    OrderBarang
  ]
})
export class OrderBarangModule {}
