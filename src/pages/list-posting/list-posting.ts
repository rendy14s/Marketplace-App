import { TranslateService } from '@ngx-translate/core';
import { LoopBackConfig } from './../../shared/sdk/lb.config';
import { AjiPostingApi } from './../../shared/sdk/services/custom/AjiPosting';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';

/**
 * Generated class for the ListPostingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-posting',
  templateUrl: 'list-posting.html',
})
export class ListPostingPage {
  public idSeller: any;
  public dataPosting: any;
  public dataLength: any;
  public loopBack: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public ajiposting: AjiPostingApi,
    public events: Events,
    public alertCtrl: AlertController,
    public translate: TranslateService
  ) {
    this.loopBack = LoopBackConfig.getPath() + '/api/containers/Rendy/download/';

    events.subscribe('update:list', () => {
      this.ionViewDidLoad();
    });
  }

  ionViewDidLoad() {
    this.storage.get('loginAuth').then((loginAuth) => {
      this.idSeller = loginAuth.id;

      this.ajiposting.find({
        where:
        { idSeller: this.idSeller }
      }).subscribe((result) => {
        console.log(result);
        this.dataPosting = result;
        this.dataLength = this.dataPosting.length;
      })
    });
  }

  public edit(datas) {
    console.log(datas);
    this.navCtrl.push('EditPostingPage', { data: datas })
  }

  public delete(datas) {
    console.log(datas);
    this.ajiposting.deleteById(datas.idBarang).subscribe((result) => {
      console.log(result);
      this.events.publish('update:list');
      let alert = this.alertCtrl.create({
        subTitle: this.translate.instant('Success Deleted'),
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

}
