import { TranslateService } from '@ngx-translate/core';
import { AjiUserAuthApi } from './../../shared/sdk/services/custom/AjiUserAuth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the AdminListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin-list',
  templateUrl: 'admin-list.html',
})
export class AdminListPage {
  public data: any;
  public lengthData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajiuser: AjiUserAuthApi,
    public alertCtrl: AlertController,
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
    public translate: TranslateService
  ) {
    events.subscribe('update:seller', () => {
      this.ionViewDidLoad();
    });
  }

  ionViewDidLoad() {
    this.ajiuser.find({
      where: {
        and: [
          { hakUser: 'seller' },
          { jenisAkun: '0' }
        ]
      }
    }).subscribe((result) => {
      this.data = result;
      this.lengthData = this.data.length;
      console.log(this.lengthData, 'Length');
    })
  }

  public action(datas) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose :',
      buttons: [
        {
          text: this.translate.instant('Detail Info Seller'),
          handler: () => {
            this.navCtrl.push('DetailSellerPage', { data: datas })
          }
        },
        {
          text: this.translate.instant('Approved Seller'),
          handler: () => {
            this.ajiuser.updateAll(
              { id: datas.id },
              { jenisAkun: '1' }
            ).subscribe((result) => {
              console.log('Sukses Update');
              this.events.publish('update:seller');
              this.approvedList();
            })
          }
        },
        {
          text: this.translate.instant('Rejected Seller'),
          handler: () => {
            this.ajiuser.updateAll(
              { id: datas.id },
              { jenisAkun: '2' }
            ).subscribe((result) => {
              console.log('Reject Update');
              this.events.publish('update:seller');
              this.rejectList();
            })
          }
        },
        {
          text: this.translate.instant('Cancel'),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  public approvedList() {
    let alert = this.alertCtrl.create({
      subTitle: this.translate.instant('Success Approved Seller'),
      buttons: ['Dismiss']
    });
    alert.present();
  }

  public rejectList() {
    let alert = this.alertCtrl.create({
      subTitle: this.translate.instant('Success Rejected Seller'),
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
