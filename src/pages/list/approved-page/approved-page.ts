import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { AjiAccorderApi } from './../../../shared/sdk/services/custom/AjiAccorder';
import { AjiOrderProsesApi } from './../../../shared/sdk/services/custom/AjiOrderProses';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiOrderApi } from './../../../shared/sdk/services/custom/AjiOrder';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ApprovedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-approved-page',
  templateUrl: 'approved-page.html',
})
export class ApprovedPage {
  public approved: any;
  public lengthApp: any;
  public dataApprove: any;
  public loopBack: any;
  public idUser: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajiorder: AjiOrderApi,
    public ajiauth: AjiUserAuthApi,
    public ajiacc: AjiAccorderApi,
    public alertCtrl: AlertController,
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
              { status: 'Approved' },
              { idCustomer: this.idUser }
            ]
          }
        }).subscribe((approved) => {
          for (let i = 0; i < approved.length; i++) {
            this.ajiauth.findById(approved[i]['idCustomer']).subscribe((result) => {
              approved[i]['namaLengkap'] = result['namaLengkap'];
            });
          }
          this.approved = approved;
          console.log(this.approved, 'approved data');

          this.lengthApp = this.approved.length;
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

  public validate(approve) {
    console.log(approve);
    this.dataApprove = approve;

    this.ajiacc.create({
      idOrder: approve.idOrder,
      idSeller: approve.idSeller,
      idCustomer: approve.idCustomer,
      tanggalAcc: approve.tanggalOrder,
      namaBarang: approve.namaBarang,
      photoBarang: approve.photoBarang,
      jenisBarang: approve.jenisBarang,
      harga: approve.harga,
      jumlahBarang: approve.jumlahBarang,
      totalHarga: approve.totalHarga,
      alamat: approve.alamat,
      status: 'Validate Approve'
    }).subscribe((res) => {
      console.log(approve.idOrder, 'idorder');
        this.ajiacc.updateAll(
          { idOrder: approve.idOrder },
          { status: 'Fully Approved' }).subscribe((approve) => {
            let confirm = this.alertCtrl.create({
              message: this.translate.instant('Thanks for your order! I Hope You Satisfied.'),
              buttons: [
                {
                  text: 'Confirm',
                  handler: () => {
                    this.navCtrl.setRoot('RatingPage', { idBarang: this.dataApprove.idBarang });
                  }
                }
              ]
            });
            confirm.present();
          });
    });
  }

}
