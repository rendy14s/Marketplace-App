import { TranslateService } from '@ngx-translate/core';
import { LoopBackConfig } from './../../shared/sdk/lb.config';
import { AjiUserAuthApi } from './../../shared/sdk/services/custom/AjiUserAuth';
import { Storage } from '@ionic/storage';
import { AjiAccorderApi } from './../../shared/sdk/services/custom/AjiAccorder';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HistoryPurchase page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-history-purchase',
  templateUrl: 'history-purchase.html',
})
export class HistoryPurchase {
  public approved: any;
  public lengthApp: any;

  public idMember: number;
  public loopBack: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajiacc: AjiAccorderApi,
    public storage: Storage,
    public ajiauth: AjiUserAuthApi,
    public translate: TranslateService
  ) {
    this.loopBack = LoopBackConfig.getPath() + '/api/containers/Rendy/download/';
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('loginAuth').then((loginAuth) => {
        this.idMember = loginAuth.id;
        console.log(this.idMember, 'id nya');
        this.ajiacc.find({
          where: {
            and: [
              { idCustomer: this.idMember },
              { status: 'Fully Approved' }
            ]
          }
        }).subscribe((approved) => {
          for (let i = 0; i < approved.length; i++) {
            this.ajiauth.findById(approved[i]['idCustomer']).subscribe((result) => {
              approved[i]['namaLengkap'] = result['namaLengkap'];
            });
          }
          this.approved = approved;
          this.lengthApp = this.approved.length;
          console.log(this.approved, 'Validate Approve');
        });
      });
    });
  }

  public detail(approve) {
    console.log(approve);
    this.navCtrl.push('DetailOrder', {
      nama: approve.namaLengkap,
      barang: approve.namaBarang,
      photo: approve.photoBarang,
      date: approve.tanggalOrder,
      jenisBarang: approve.jenisBarang,
      qty: approve.jumlahBarang,
      alamat: approve.alamat,
      totalHarga: approve.totalHarga
    })
  }

}
