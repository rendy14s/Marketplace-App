import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPurchase } from './history-purchase';

@NgModule({
  declarations: [
    HistoryPurchase,
  ],
  imports: [
    IonicPageModule.forChild(HistoryPurchase),
    TranslateModule.forChild()
  ],
  exports: [
    HistoryPurchase
  ]
})
export class HistoryPurchaseModule {}
