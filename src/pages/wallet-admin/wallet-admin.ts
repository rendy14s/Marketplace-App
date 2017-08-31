import { LoopBackConfig } from './../../shared/sdk/lb.config';
import { Storage } from '@ionic/storage';
import { AjiUserAuthApi } from './../../shared/sdk/services/custom/AjiUserAuth';
import { AjiTopupApi } from './../../shared/sdk/services/custom/AjiTopup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events, AlertController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/**
 * Generated class for the WalletAdminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-wallet-admin',
  templateUrl: 'wallet-admin.html',
})
export class WalletAdminPage {
  public dataTopup: any;
  public dataTopupLength: any;
  public tempStatus: any;
  public colorFirst: boolean;
  public colorSecond: boolean;
  public idTopUp: any;
  public topUp: any;
  public topUpNow: any;
  public loopBack: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajitoptup: AjiTopupApi,
    public actionSheetCtrl: ActionSheetController,
    public events: Events,
    public ajiauth: AjiUserAuthApi,
    public storage: Storage,
    public alertCtrl: AlertController,
    private photoViewer: PhotoViewer
  ) {
    this.loopBack = LoopBackConfig.getPath() + '/api/containers/Rendy/download/';

    events.subscribe('update:list', () => {
      this.ionViewDidLoad();
    });
  }

  ionViewDidLoad() {
    this.ajitoptup.find({
      where:
      { status: '0' },
    }).subscribe((result) => {
      console.log(result, 'data top up');
      this.dataTopup = result;
      this.dataTopupLength = this.dataTopup.length;
    })
  }

  public action(datas) {
    console.log(datas, 'Data Top Up');
    this.idTopUp = datas.id;
    1
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Confirm Data',
      buttons: [
        {
          text: 'Approved',
          handler: () => {
            this.ajitoptup.updateAll(
              { id: this.idTopUp },
              { status: '1' }
            ).subscribe((result) => { 
              console.log(result, 'Sukses Approved');
              this.ajiauth.findById(datas.idCustomer).subscribe((result) => {
                console.log(result, 'Data BOS')
                this.topUpNow = result;
                console.log(this.topUpNow.topup, 'TOP UP NOW');

                let gcash: number;
                gcash = parseInt(this.topUpNow.topup) + parseInt(datas.nominal);
                console.log(gcash, 'Hasil Jumlah');
                this.ajiauth.updateAll({ id: datas.idCustomer }, { topup: gcash }).subscribe((topup) => {
                  console.log(topup, 'Sukses Top Up');

                  let alert = this.alertCtrl.create({
                    title: 'Success',
                    message: 'Wallet has been success to Top Up!',
                    buttons: ['OK']
                  });
                  alert.present();

                });
                this.events.publish('update:list');
              })
            })
          }
        }, {
          text: 'Rejected',
          handler: () => {
            this.ajitoptup.updateAll(
              { id: this.idTopUp },
              { status: '2' }
            ).subscribe((result) => {
              console.log(result, 'Sukses Rejected');
              this.events.publish('update:list');
            })
          }
        }, {
          text: 'View Photo Bank',
          handler: () => {
            console.log(this.loopBack + datas.photo);
            this.photoViewer.show(this.loopBack + datas.photo);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
