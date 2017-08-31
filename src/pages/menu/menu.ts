import { TranslateService } from '@ngx-translate/core';
import { ListPage } from './../list/list';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, Platform, Events, AlertController } from 'ionic-angular';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  public photo: any = 'assets/images/logo.png';
  public rootPage: any = HomePage;
  public pages: Array<{ title: string, component: any, icons: any, show: boolean }>;
  public roleCust: boolean = true;
  public roleSeller: boolean = true;
  public roleAdmin: boolean = true;
  public rolePublic: boolean = true;
  public hakUser: any;
  public userName: any;
  public Roll: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public oneSignal: OneSignal,
    public storage: Storage,
    public platform: Platform,
    public events: Events,
    public alertCtrl: AlertController,
    public translate: TranslateService
  ) {

    this.storage.ready().then(() => {
      this.storage.get('loginAuth').then((loginAuth) => {
        this.userName = loginAuth.namaLengkap;

        if (loginAuth == null || loginAuth == undefined) {
          this.rootPage = 'LoginPage';
        } else {
          this.hakUser = loginAuth.hakUser;
          if (this.hakUser == 'seller') {
            this.roleCust = false;
            this.roleAdmin = false;
            this.Roll = 'Seller';
          } else if (this.hakUser == 'customer') {
            this.roleSeller = false;
            this.roleAdmin = false;
            this.Roll = 'Customer';
          } else if (this.hakUser == 'admin') {
            this.roleSeller = false;
            this.roleCust = false;
            this.rolePublic = false;
            this.Roll = 'Admin';
          }
          this.nav.setRoot(HomePage);
          this.loadMenu();
        }
      });
    });

    events.subscribe('user:created', (hak) => {
      this.loadStorage();
      this.loadMenu();
    });
  }

  public loadStorage() {
    this.storage.ready().then(() => {
      this.storage.get('loginAuth').then((loginAuth) => {

        if (loginAuth == null || loginAuth == undefined) {
          this.rootPage = 'LoginPage';
        } else {
          this.hakUser = loginAuth.hakUser;
          if (this.hakUser == 'seller') {
            this.roleCust = false;
          } else if (this.hakUser == 'customer') {
            this.roleSeller = false;
          } else if (this.hakUser == 'admin') {
            this.roleCust = false;
            this.roleSeller = false;
            this.rolePublic = false;
          }
          this.nav.setRoot(MenuPage);
        }
      });
    });
  }

  public loadMenu() {
    this.pages = [
      { title: 'Home', component: HomePage, icons: 'home', show: true },
      { title: 'Chat', component: 'ChatPage', icons: 'chatbubbles', show: this.rolePublic },
      { title: 'Cart', component: ListPage, icons: 'cart', show: this.roleCust },
      { title: 'History Purchase', component: 'HistoryPurchase', icons: 'list-box', show: this.roleCust },
      { title: 'My Wallet', component: 'MyWallet', icons: 'logo-usd', show: this.roleCust },
      { title: 'Delivery Order', component: 'DeliveryOrder', icons: 'cash', show: this.roleSeller },
      { title: 'Report Budget', component: 'ReportBudgetPage', icons: 'paper', show: this.roleSeller },
      { title: 'Registration Seller', component: 'AdminListPage', icons: 'paper', show: this.roleAdmin },
      { title: 'Wallet Top Up', component: 'WalletAdminPage', icons: 'logo-usd', show: this.roleAdmin },
      { title: 'List Seller', component: 'ListPostingPage', icons: 'list-box', show: this.roleSeller }
    ];
  }

  public openPage(page) {
    this.nav.setRoot(page.component);
  }

  public gotoLogout() {
    let alert = this.alertCtrl.create({
      title: this.translate.instant('Confirm'),
      message: this.translate.instant('Do you want logout?'),
      buttons: [
        {
          text: this.translate.instant('Cancel'),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('Yes'),
          handler: () => {
            this.oneSignal.deleteTags(['userid']);
            this.storage.clear();
            window.localStorage.clear();
            this.navCtrl.setRoot('LoginPage');
          }
        }
      ]
    });
    alert.present();
  }

  public language() {
    this.navCtrl.push('SettingPage');
  }



}
