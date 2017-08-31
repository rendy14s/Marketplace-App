import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPostingPage } from './list-posting';

@NgModule({
  declarations: [
    ListPostingPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPostingPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListPostingPage
  ]
})
export class ListPostingPageModule {}
