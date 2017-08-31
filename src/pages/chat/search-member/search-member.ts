import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchMemberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-member',
  templateUrl: 'search-member.html',
})
export class SearchMemberPage {
  public userHak: any;
  public member: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajiuser: AjiUserAuthApi,
    public storage: Storage,
    public translate: TranslateService
  ) {

  }

  ionViewDidLoad() {
    this.storage.get('loginAuth').then((loginAuth) => {
      this.userHak = loginAuth.hakUser;
      console.log(this.userHak);

      if (this.userHak == 'customer') {
        this.ajiuser.find({
          where:
          { hakUser: 'seller' }
        }).subscribe((result) => {
          this.member = result;
        });
      } else if (this.userHak == 'seller') {
        this.ajiuser.find({
          where:{
            and:[
              { hakUser: 'customer' },
              { jenisAkun: '1' }   
            ]
          }
        }).subscribe((result) => {
          this.member = result;
        })
      }

    })
  }

  public room(members) {
    this.navCtrl.push('ChatRoomPage', { data: members })
  }

}
