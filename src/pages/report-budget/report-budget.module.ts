import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportBudgetPage } from './report-budget';

@NgModule({
  declarations: [
    ReportBudgetPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportBudgetPage),
    TranslateModule.forChild()
  ],
  exports: [
    ReportBudgetPage
  ]
})
export class ReportBudgetPageModule {}
