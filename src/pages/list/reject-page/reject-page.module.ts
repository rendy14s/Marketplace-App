import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RejectPage } from './reject-page';

@NgModule({
  declarations: [
    RejectPage,
  ],
  imports: [
    IonicPageModule.forChild(RejectPage),
    TranslateModule.forChild()
  ],
  exports: [
    RejectPage
  ]
})
export class RejectPageModule {}
