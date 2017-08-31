import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  public language = 'id';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public translate: TranslateService
  ) {
    console.log(this.translate.getDefaultLang());
    this.translate.get('HELLO').subscribe(
      value => {
        // value is our translated string
        console.log(value);
      });
    console.log(this.translate.getDefaultLang(), 'Defaultnya');
    this.storage.get('language').then(result => {
      if (result == null) {
        console.log(123);
        this.storage.set('language', 'id');
        this.translate.setDefaultLang('id');
      } else {
        this.language = this.translate.getDefaultLang();
      }
    });

  }

  ionViewDidLoad() {

  }

  public onChange(value): any {
    console.log(value);
    this.language = value;
    this.translate.setDefaultLang(value);
    this.translate.use(value);
    this.storage.set('language', value);
  }

}
