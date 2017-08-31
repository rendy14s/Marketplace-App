import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { AjiOrderProsesApi } from './../../../shared/sdk/services/custom/AjiOrderProses';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiOrderApi } from './../../../shared/sdk/services/custom/AjiOrder';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProsesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-proses-page',
  templateUrl: 'proses-page.html',
})
export class ProsesPage {
  public proseses: any;
  public lengthProses: any;
  public loopBack: any;
  public idUser: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajiauth: AjiUserAuthApi,
    public ajiorder: AjiOrderApi,
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
              { status: 'Proses' },
              { idCustomer: this.idUser }
            ]
          }
        }).subscribe((proses) => {
          for (let i = 0; i < proses.length; i++) {
            this.ajiauth.findById(proses[i]['idCustomer']).subscribe((result) => {
              proses[i]['namaLengkap'] = result['namaLengkap'];
            });
          }
          this.proseses = proses;
          this.lengthProses = this.proseses.length;
          console.log(this.proseses, 'Proses')
        });
      });
    });
  }

  detail(proses) {
    console.log(proses);
    this.navCtrl.push('DetailOrder', {
      nama: proses.namaLengkap,
      barang: proses.namaBarang,
      photo: proses.photoBarang,
      date: proses.tanggalOrder,
      jenisBarang: proses.jenisBarang,
      qty: proses.jumlahBarang,
      alamat: proses.alamat,
      totalHarga: proses.totalHarga
    })
  }

}
