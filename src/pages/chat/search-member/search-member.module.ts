import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMemberPage } from './search-member';

@NgModule({
  declarations: [
    SearchMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchMemberPage),
    TranslateModule.forChild()
  ],
  exports: [
    SearchMemberPage
  ]
})
export class SearchMemberPageModule {}
