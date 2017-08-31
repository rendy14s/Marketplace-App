import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the DeliveryOrder page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delivery-order',
  templateUrl: 'delivery-order.html',
})
export class DeliveryOrder {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public translate: TranslateService
  ) {
  }
   public waiting(){
    this.navCtrl.push('DeliveryWaitingPage');
  }

  public proses(){
    this.navCtrl.push('DeliveryProsesPage');
  }

  public reject(){
    this.navCtrl.push('DeliveryRejectPage');
  }

  public approve(){
    this.navCtrl.push('DeliveryOrderApproval');
  }

}
