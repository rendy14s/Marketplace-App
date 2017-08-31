import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyWallet } from './my-wallet';

@NgModule({
  declarations: [
    MyWallet,
  ],
  imports: [
    IonicPageModule.forChild(MyWallet),
    TranslateModule.forChild()
  ],
  exports: [
    MyWallet
  ]
})
export class MyWalletModule {}
