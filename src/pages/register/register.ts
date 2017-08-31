import { TranslateService } from '@ngx-translate/core';
import { AjiUserAuthApi } from './../../shared/sdk/services/custom/AjiUserAuth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  public nama: any;
  public alamat: any;
  public no_telp: any;
  public tempat: any;
  public tanggal: any;
  public jenis_kelamin: any;
  public jenis_account: any;
  public username: any;
  public password: any;
  public passwordAuth: any;
  public bank: any;
  public data = {};
  public hak: any;
  public dataBank: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajiauth: AjiUserAuthApi,
    private alertCtrl: AlertController,
    public translate: TranslateService
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  public login() {
    this.nama = this.data['nama'];
    this.alamat = this.data['alamat'];
    this.tempat = this.data['tempat'];
    this.tanggal = this.data['tanggal'];
    this.no_telp = this.data['no_telp'];
    this.jenis_kelamin = this.data['jenis_kelamin'];
    this.jenis_account = this.data['jenis_account'];
    this.username = this.data['username'];
    this.password = this.data['password'];
    this.passwordAuth = this.data['passwordAuth'];
    this.bank = this.data['bank'];

    if (this.jenis_account == 'Customer') {
      this.hak = 'customer';
    } else if (this.jenis_account == 'Seller') {
      this.hak = 'seller';
    }
    if (this.username == null || this.username == undefined) {
      let alert = this.alertCtrl.create({
        message: this.translate.instant('Sorry, Username cant be blank'),
        buttons: ['OK']
      });
      alert.present();
    } else if (this.password == null || this.password == undefined) {
      let alert = this.alertCtrl.create({
        message: this.translate.instant('Sorry, Password cant be blank'),
        buttons: ['OK']
      });
      alert.present();
    } else if (this.jenis_account == null || this.jenis_account == undefined){
      let alert = this.alertCtrl.create({
        message: this.translate.instant('Sorry, Your type account cant be blank'),
        buttons: ['OK']
      });
      alert.present();
    } else {

      if (this.passwordAuth !== this.password) {
        let alert = this.alertCtrl.create({
          message: this.translate.instant('Sorry, your password not syncron'),
          buttons: [
            {
              text: 'Dismiss',
              handler: () => {

              }
            }
          ]
        });
        alert.present();
      } else {

        this.ajiauth.create({
          userauth: this.username,
          passauth: this.password,
          namaLengkap: this.nama,
          alamat: this.alamat,
          noTelp: this.no_telp,
          tempatLahir: this.tempat,
          tanggalLahir: this.tanggal,
          jenisKelamin: this.jenis_kelamin,
          hakUser: this.hak,
          bank: this.bank
        }).subscribe((result) => {
          console.log('Sukses Register');
          this.alertConfirm();
        })
      }
    }
  }

  alertConfirm() {
    let alert = this.alertCtrl.create({
      message: this.translate.instant('Success Register! Enjoy Shopping and Selling'),
      buttons: [
        {
          text: 'Dismiss',
          handler: () => {
            this.navCtrl.setRoot('LoginPage');
          }
        }
      ]
    });
    alert.present();
  }

  changeLang(value): any {
    console.log(value, 'Bahasa Ganti');
    const choose = value;
    if (choose == 'Seller') {
      this.dataBank = false;
    } else {
      this.dataBank = true;
    }
  }

}
