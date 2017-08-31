import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiOrderApi } from './../../../shared/sdk/services/custom/AjiOrder';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WaitingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-waiting-page',
  templateUrl: 'waiting-page.html',
})
export class WaitingPage {
  public waiting: any;
  public lengthWait: any;
  public loopBack: any;
  public idUser: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajiorder: AjiOrderApi,
    public ajiauth: AjiUserAuthApi,
    public storage: Storage,
    public translate: TranslateService
  ) {
    this.loopBack = LoopBackConfig.getPath() + '/api/containers/Rendy/download/';
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('loginAuth').then((loginAuth) => {
        this.idUser = loginAuth.id
        console.log(this.idUser, 'Id User');

        this.ajiorder.find({
          where: {
            and: [
              { status: 'Waiting approval from seller' },
              { idCustomer: this.idUser }
            ]
          }
        }).subscribe((waitings) => {
          for (let i = 0; i < waitings.length; i++) {
            this.ajiauth.findById(waitings[i]['idCustomer']).subscribe((result) => {
              waitings[i]['namaLengkap'] = result['namaLengkap'];
            });
          }
          this.waiting = waitings;
          this.lengthWait = this.waiting.length;
        });
      });
    });
  }

  detail(wait) {
    console.log(wait);
    this.navCtrl.push('DetailOrder', {
      nama: wait.namaLengkap,
      barang: wait.namaBarang,
      photo: wait.photoBarang,
      date: wait.tanggalOrder,
      jenisBarang: wait.jenisBarang,
      qty: wait.jumlahBarang,
      alamat: wait.alamat,
      totalHarga: wait.totalHarga,
      idSeller: wait.idSeller
    })
  }

}
