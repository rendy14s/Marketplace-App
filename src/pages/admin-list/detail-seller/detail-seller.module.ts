import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailSellerPage } from './detail-seller';

@NgModule({
  declarations: [
    DetailSellerPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailSellerPage),
    TranslateModule.forChild()
  ],
  exports: [
    DetailSellerPage
  ]
})
export class DetailSellerPageModule {}
