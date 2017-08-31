import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnggasPage } from './unggas';

@NgModule({
  declarations: [
    UnggasPage,
  ],
  imports: [
    IonicPageModule.forChild(UnggasPage),
    TranslateModule.forChild()
  ],
  exports: [
    UnggasPage
  ]
})
export class UnggasPageModule {}
