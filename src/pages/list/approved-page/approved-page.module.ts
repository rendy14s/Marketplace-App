import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApprovedPage } from './approved-page';

@NgModule({
  declarations: [
    ApprovedPage,
  ],
  imports: [
    IonicPageModule.forChild(ApprovedPage),
    TranslateModule.forChild()
  ],
  exports: [
    ApprovedPage
  ]
})
export class ApprovedPageModule {}
