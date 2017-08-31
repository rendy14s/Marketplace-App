import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { AjiOrderProsesApi } from './../../../shared/sdk/services/custom/AjiOrderProses';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiOrderApi } from './../../../shared/sdk/services/custom/AjiOrder';

/**
 * Generated class for the DeliveryWaitingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delivery-waiting-page',
  templateUrl: 'delivery-waiting-page.html',
})
export class DeliveryWaitingPage {
  public waiting: any;
  public lengthWait: any;
  public datas: any;
  public datax: any;
  public loopBack: any;
  public idUser: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajiorder: AjiOrderApi,
    public ajiauth: AjiUserAuthApi,
    public alertCtrl: AlertController,
    public ajiorderproses: AjiOrderProsesApi,
    public loadingCtrl: LoadingController,
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

        this.ajiorder.find({
          where: {
            and: [
              { status: 'Waiting approval from seller' },
              { idSeller: this.idUser }
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
    this.navCtrl.push('DeliveryDetailOrder', {
      nama: wait.namaLengkap,
      barang: wait.namaBarang,
      photo: wait.photoBarang,
      date: wait.tanggalOrder,
      jenisBarang: wait.jenisBarang,
      qty: wait.jumlahBarang,
      alamat: wait.alamat,
      totalHarga: wait.totalHarga
    })
  }

  public proses(wait) {
    console.log(wait);
    let loading = this.loadingCtrl.create({
      content: this.translate.instant('Please wait...')
    });

    loading.present();
    this.ajiorderproses.create({
      idOrder: wait.idOrder,
      idBarang: wait.idBarang,
      idSeller: wait.idSeller,
      idCustomer: wait.idCustomer,
      tanggalOrder: wait.tanggalOrder,
      namaBarang: wait.namaBarang,
      photoBarang: wait.photoBarang,
      jenisBarang: wait.jenisBarang,
      harga: wait.harga,
      jumlahBarang: wait.jumlahBarang,
      totalHarga: wait.totalHarga,
      alamat: wait.alamat,
      status: 'Proses',
      payment: wait.payment,
      paymentTot: wait.paymentTot
    }).subscribe((proses) => {
      this.datax = proses;
      console.log(this.datax, 'datas');
      this.ajiorder.deleteById(wait.idOrder).subscribe((res) => {
        console.log('Sukses Delete');
        loading.dismiss();
        this.events.publish('update:list');
        let alert = this.alertCtrl.create({
          title: this.translate.instant('Success'),
          subTitle: this.translate.instant('Success update status to proses'),
          buttons: ['OK']
        });
        alert.present();
      })
    });
  }

  public reject(wait) {
    console.log(wait);
    let loading = this.loadingCtrl.create({
      content: this.translate.instant('Please wait...')
    });

    loading.present();
    this.ajiorderproses.create({
      idOrder: wait.idOrder,
      idBarang: wait.idBarang,
      idSeller: wait.idSeller,
      idCustomer: wait.idCustomer,
      tanggalOrder: wait.tanggalOrder,
      namaBarang: wait.namaBarang,
      photoBarang: wait.photoBarang,
      jenisBarang: wait.jenisBarang,
      harga: wait.harga,
      jumlahBarang: wait.jumlahBarang,
      totalHarga: wait.totalHarga,
      alamat: wait.alamat,
      status: 'Rejected',
      payment: wait.payment,
      paymentTot: wait.paymentTot
    }).subscribe((proses) => {
      this.datax = proses;
      console.log(this.datax, 'datas');
      this.ajiorder.deleteById(wait.idOrder).subscribe((res) => {
        console.log('Sukses Delete');
        loading.dismiss();
        this.events.publish('update:list');
        let alert = this.alertCtrl.create({
          title: this.translate.instant('Success'),
          subTitle: this.translate.instant('Success update status to rejected'),
          buttons: ['OK']
        });
        alert.present();
      })
    });
  }

}
