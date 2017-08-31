import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { AjiOrderProsesApi } from './../../../shared/sdk/services/custom/AjiOrderProses';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiOrderApi } from './../../../shared/sdk/services/custom/AjiOrder';

/**
 * Generated class for the DeliveryRejectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delivery-reject-page',
  templateUrl: 'delivery-reject-page.html',
})
export class DeliveryRejectPage {
  public rejected: any;
  public lengthRej: any;
  public loopBack: any;
  public idUser: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajiorder: AjiOrderApi,
    public ajiauth: AjiUserAuthApi,
    public ajiorderproses: AjiOrderProsesApi,
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

        this.ajiorderproses.find({
           where: {
            and: [
              { status: 'Rejected' },
              { idSeller: this.idUser }
            ]
          }
        }).subscribe((rejected) => {
          for (let i = 0; i < rejected.length; i++) {
            this.ajiauth.findById(rejected[i]['idCustomer']).subscribe((result) => {
              rejected[i]['namaLengkap'] = result['namaLengkap'];
            });
          }
          this.rejected = rejected;
          this.lengthRej = this.rejected.length;
        });
      });
    });
  }


  detail(reject) {
    console.log(reject);
    this.navCtrl.push('DeliveryDetailOrder', {
      nama: reject.namaLengkap,
      barang: reject.namaBarang,
      photo: reject.photoBarang,
      date: reject.tanggalOrder,
      jenisBarang: reject.jenisBarang,
      qty: reject.jumlahBarang,
      alamat: reject.alamat,
      totalHarga: reject.totalHarga
    })
  }

}
