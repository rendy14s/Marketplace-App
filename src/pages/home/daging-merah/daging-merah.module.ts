import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DagingMerahPage } from './daging-merah';

@NgModule({
  declarations: [
    DagingMerahPage,
  ],
  imports: [
    IonicPageModule.forChild(DagingMerahPage),
    TranslateModule.forChild()
  ],
  exports: [
    DagingMerahPage
  ]
})
export class DagingMerahPageModule {}
