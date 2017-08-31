import { Storage } from '@ionic/storage';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { AjiOrderProsesApi } from './../../../shared/sdk/services/custom/AjiOrderProses';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiOrderApi } from './../../../shared/sdk/services/custom/AjiOrder';

/**
 * Generated class for the DeliveryOrderApproval page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delivery-order-approval',
  templateUrl: 'delivery-order-approval.html',
})
export class DeliveryOrderApproval {
  public approved: any;
  public lengthApp: any;
  public loopBack: any;
  public idUser: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajiorder: AjiOrderApi,
    public ajiauth: AjiUserAuthApi,
    public ajiorderproses: AjiOrderProsesApi,
    public storage: Storage
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
              { status: 'Approved' },
              { idSeller: this.idUser }
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
        });
      });
    });
  }

  detail(approve) {
    console.log(approve);
    this.navCtrl.push('DeliveryDetailOrder', {
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
