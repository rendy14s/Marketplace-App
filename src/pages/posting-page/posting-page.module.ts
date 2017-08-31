import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostingPage } from './posting-page';

@NgModule({
  declarations: [
    PostingPage,
  ],
  imports: [
    IonicPageModule.forChild(PostingPage),
    TranslateModule.forChild()
  ],
  exports: [
    PostingPage
  ]
})
export class PostingPageModule {}
