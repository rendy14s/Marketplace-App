import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { AjiOrderProsesApi } from './../../../shared/sdk/services/custom/AjiOrderProses';
import { AjiAccorderApi } from './../../../shared/sdk/services/custom/AjiAccorder';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiOrderApi } from './../../../shared/sdk/services/custom/AjiOrder';

/**
 * Generated class for the DeliveryProsesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delivery-proses-page',
  templateUrl: 'delivery-proses-page.html',
})
export class DeliveryProsesPage {
  public proseses: any;
  public lengthProses: any;
  public loopBack: any;
  public idUser: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajiauth: AjiUserAuthApi,
    public ajiorder: AjiOrderApi,
    public alertCtrl: AlertController,
    public ajiacc: AjiAccorderApi,
    public ajiorderproses: AjiOrderProsesApi,
    public events: Events,
    public storage: Storage,
    public translate: TranslateService
  ) {
    this.loopBack = LoopBackConfig.getPath() + '/api/containers/Rendy/download/';

    events.subscribe('update:list', () => {
      this.ionViewDidLoad();
    });
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
              { idSeller: this.idUser }
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
        });
      });
    });
  }

  detail(proses) {
    console.log(proses);
    this.navCtrl.push('DeliveryDetailOrder', {
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

  public approve(proses) {
    console.log(proses);

    this.ajiorderproses.updateAll(
      { idOrder: proses.idOrder },
      { status: 'Approved' }).subscribe((approve) => {
        console.log(approve, 'approved');
        this.events.publish('update:list');
        let alert = this.alertCtrl.create({
          title: this.translate.instant('Success'),
          subTitle: this.translate.instant('Success update status to approved'),
          buttons: ['OK']
        });
        alert.present();
      })
  }

}
