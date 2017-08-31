import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SayurMayurPage } from './sayur-mayur';

@NgModule({
  declarations: [
    SayurMayurPage,
  ],
  imports: [
    IonicPageModule.forChild(SayurMayurPage),
    TranslateModule.forChild()
  ],
  exports: [
    SayurMayurPage
  ]
})
export class SayurMayurPageModule {}
