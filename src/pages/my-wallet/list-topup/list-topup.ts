import { TranslateService } from '@ngx-translate/core';
import { AjiTopupApi } from './../../../shared/sdk/services/custom/AjiTopup';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListTopupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-topup',
  templateUrl: 'list-topup.html',
})
export class ListTopupPage {
  public idMember: any;
  public dataTopup: any;
  public dataTopupLength: any;
  public tempStatus: any;
  public colorFirst: boolean;
  public colorSecond: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public ajitopup: AjiTopupApi,
    public translate: TranslateService
  ) {
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('loginAuth').then((loginAuth) => {
        this.idMember = loginAuth.id;
        console.log(this.idMember, 'id nya');

        this.ajitopup.find({
          where: {
            and: [
              { status: '0' },
              { idCustomer: this.idMember }
            ]
          }
        }).subscribe((result) => {
          console.log(result, 'data top up');
          this.dataTopup = result;
          this.dataTopupLength = this.dataTopup.length;
          for(let i = 0; i < this.dataTopup.length; i++){
            if(this.dataTopup[i].status == '0'){
              this.tempStatus = 'Un-Verified';
              this.colorFirst = false;
              this.colorSecond = true; 
            }else {
              this.tempStatus = 'Verified';
              this.colorFirst = true;
              this.colorSecond = false; 
            }
            this.dataTopup[i].tempStatus = this.tempStatus;
          }
        })
      });
    });

  }

}
