import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailBarang } from './detail-barang';

@NgModule({
  declarations: [
    DetailBarang,
  ],
  imports: [
    IonicPageModule.forChild(DetailBarang),
    TranslateModule.forChild()
  ],
  exports: [
    DetailBarang
  ]
})
export class DetailBarangModule {}
