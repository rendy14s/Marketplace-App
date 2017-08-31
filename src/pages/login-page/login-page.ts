import { TranslateService } from '@ngx-translate/core';
import { OneSignal } from '@ionic-native/onesignal';
import { AjiUserAuthApi } from './../../shared/sdk/services/custom/AjiUserAuth';
import { Storage } from '@ionic/storage';
// import { HomePage } from './../home/home';
import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',

  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0)' }),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
          style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]

})
export class LoginPage {
  public loading: Loading;
  public email: any;
  public password: any;
  public hakUser: any;
  public dataLogin: any;
  // rootPage = 'HomePage';
  constructor(
    private navCtrl: NavController,
    private AjiUserAuth: AjiUserAuthApi,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public storage: Storage,
    public events: Events,
    public onesignal: OneSignal,
    public translate: TranslateService
  ) {

  }

  ionViewDidLoad() {

  }

  public createAccount() {
    this.navCtrl.push('Register');
  }

  public login() {
    this.AjiUserAuth.findOne({
      where: {
        and: [
          { userauth: this.email },
          { passauth: this.password }
        ]
      }
    }).subscribe((result) => {
      console.log(result, 'Data Login');
      this.dataLogin = result;
      this.hakUser = result;
      let haq = this.hakUser.hakUser;

      if (haq == 'seller') {
        console.log('INI SELLER');
        if (this.dataLogin.jenisAkun == '0') {
          let alert = this.alertCtrl.create({
            title: this.translate.instant('Status'),
            subTitle: this.translate.instant('Ups.. Your Account have not be confirm with admin. Please contact admin for more information.'),
            buttons: ['OK']
          });
          alert.present(prompt);
          this.loading.dismiss();
        } else if (this.dataLogin.jenisAkun == '2') {
          let alert = this.alertCtrl.create({
            title: this.translate.instant('Status'),
            subTitle: this.translate.instant('Ups.. Your Account have been rejected with admin. Please contact admin for more information.'),
            buttons: ['OK']
          });
          alert.present();
        } else if (this.dataLogin.jenisAkun == '1') {
          this.storage.set('loginAuth', result)

          this.onesignal.sendTags({ 'userid': this.dataLogin.id });

          this.events.publish('user:created', this.hakUser.hakUser);

          this.navCtrl.setRoot('MenuPage');

        }
      } else {
        console.log('INI CUSTOMER');
        this.storage.set('loginAuth', result)

        this.onesignal.sendTags({ 'userid': this.dataLogin.id });

        this.events.publish('user:created', this.hakUser.hakUser);

        this.navCtrl.setRoot('MenuPage');
      }
    }, (error) => {
      let alert = this.alertCtrl.create({
        subTitle: this.translate.instant('Username atau password anda salah'),
        buttons: [
          {
            text: this.translate.instant('Dismiss'),
            handler: () => {
            }
          }]
      });
      alert.present();
    });
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
