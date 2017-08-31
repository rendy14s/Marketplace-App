import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService
  ) {
  }

  ionViewDidLoad() {
    
  }

  public waiting(){
    this.navCtrl.push('WaitingPage');
  }

  public proses(){
    this.navCtrl.push('ProsesPage');
  }

  public reject(){
    this.navCtrl.push('RejectPage');
  }

  public approve(){
    this.navCtrl.push('ApprovedPage');
  }
}
