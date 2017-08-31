import { OneSignal } from '@ionic-native/onesignal';
import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public language = 'id';
  public rootPage: any;
  public hakUser: any;
  public roleCust: any;
  public roleSeller

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public oneSignal: OneSignal,
    public events: Events,
    public translate: TranslateService
  ) {

    this.storage.ready().then(() => {

      this.storage.get('loginAuth').then((loginAuth) => {

        if (loginAuth == null || loginAuth == undefined) {
          this.rootPage = 'LoginPage';
        } else {
          this.hakUser = loginAuth.hakUser;
          console.log(this.hakUser, 'Role');
          if (this.hakUser == 'seller') {
            this.roleCust = false;
          } else if (this.hakUser == 'customer') {
            this.roleSeller = false;
          }
          this.nav.setRoot('MenuPage');
        }
      });

      this.storage.get('language').then((language) => {
        if (this.language != null && this.language != undefined) {
          this.translate.setDefaultLang(this.language);
          this.translate.use(this.language);
        }
      });

    });
   
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.initOnesignal();
      }
    });
  }

  initOnesignal() {

    this.oneSignal.startInit('c36cc157-3385-48fa-a4e1-e705aebb60db', '821464389286');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe(data => { });

    this.oneSignal.handleNotificationOpened().subscribe(result => {
      
    });
    this.oneSignal.endInit();
  }

}
