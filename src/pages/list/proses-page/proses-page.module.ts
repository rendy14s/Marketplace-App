import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProsesPage } from './proses-page';

@NgModule({
  declarations: [
    ProsesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProsesPage),
    TranslateModule.forChild()
  ],
  exports: [
    ProsesPage
  ]
})
export class ProsesPageModule {}
