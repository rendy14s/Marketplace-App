import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPostingPage } from './edit-posting';

@NgModule({
  declarations: [
    EditPostingPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPostingPage),
    TranslateModule.forChild()
  ],
  exports: [
    EditPostingPage
  ]
})
export class EditPostingPageModule {}
