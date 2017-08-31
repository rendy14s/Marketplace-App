import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AjiTopupApi } from './../../../shared/sdk/services/custom/AjiTopup';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

/**
 * Generated class for the DetailPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-payment',
  templateUrl: 'detail-payment.html',
})
export class DetailPaymentPage {
  public photo: any;
  public imageData: any;
  public option: any;

  public cash: any;
  public idMember: number;
  public bank: any;
  public nominal: any;
  public topUp = {};
  public idUser: any;
  public namaCustomer: any;
  public fileName: any;
  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public ajiauth: AjiUserAuthApi,
    public alertCtrl: AlertController,
    public events: Events,
    public ajitopup: AjiTopupApi,
    public storage: Storage,
    public translate: TranslateService
  ) {
  
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('loginAuth').then((loginAuth) => {
        this.idUser = loginAuth.id;
        this.namaCustomer = loginAuth.namaLengkap;
        console.log(this.idUser, 'Id User');
      });
    });
    this.photo = this.params.get('photo');
    console.log(this.photo, 'Photo nya');
    this.imageData = this.params.get('imageData');
    console.log(this.imageData, 'ImageData nya');
    this.option = this.params.get('options');
    console.log(this.option, 'Options nya');
    this.cash = this.params.get('cash');
    this.idMember = this.params.get('idMember')

    this.fileName = this.params.get('fileName');
    console.log(this.fileName, 'FileName nya')
    console.log(this.photo, 'Photo');
    console.log(this.imageData, 'ImageData');
    console.log(this.option, 'Options');
    console.log(this.cash, 'Cash');
    console.log(this.idMember, 'idMember');
  }

  topup() {
    this.nominal = this.topUp['nominal'];
    this.bank = this.topUp['bank'];
    console.log(this.bank)
    
    this.ajitopup.create({
      idCustomer: this.idUser,
      namaCustomer: this.namaCustomer,
      photo: this.fileName,
      nominal: this.nominal,
      toBank: '7111-846-27',
      status: '0'
    }).subscribe((result) => {
      console.log('Sukses Insert to Top UP');
      this.navCtrl.setRoot('ListTopupPage');
    })
    // let gcash: number;
    // gcash = parseInt(this.cash) + parseInt(this.nominal);
    // console.log(gcash, 'total gcashnya');
    // this.ajiauth.updateAll({ id: this.idMember }, { topup: gcash }).subscribe((topup) => {
    //   console.log(topup, 'Sukses Top Up');
    //   let tops = topup;
    //   console.log(tops['topup'], 'haiiiiiiiiiiii');
      
      // this.events.publish('user:created', this.hakUser.hakUser);

    //   let alert = this.alertCtrl.create({
    //     title: 'Success',
    //     message: 'Your Wallet has been success to Top Up!',
    //     buttons: [
    //       {
    //         text: 'OK',
    //         handler: () => {
    //           this.navCtrl.setRoot('MyWallet');
    //         }
    //       }
    //     ]
    //   });
    //   alert.present();

    // });
  }

}
