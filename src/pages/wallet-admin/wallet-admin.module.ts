import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletAdminPage } from './wallet-admin';

@NgModule({
  declarations: [
    WalletAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletAdminPage),
    TranslateModule.forChild()
  ],
  exports: [
    WalletAdminPage
  ]
})
export class WalletAdminPageModule {}
