import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiPostingApi } from './../../../shared/sdk/services/custom/AjiPosting';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';

/**
 * Generated class for the BumbuDapurPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bumbu-dapur',
  templateUrl: 'bumbu-dapur.html',
})
export class BumbuDapurPage {
  public bumbu: any;
  public bumbuLength: any;
  public loopBack: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ajiposting: AjiPostingApi,
    public loadingCtrl: LoadingController,
    public ajiuser: AjiUserAuthApi,
    public translate: TranslateService
  ) {
    this.loopBack = LoopBackConfig.getPath() + '/api/containers/Rendy/download/';
  }

  ionViewDidLoad() {
     let loading = this.loadingCtrl.create({
      content: this.translate.instant('Please wait...')
    });

    loading.present();
    this.ajiposting.find({
      where:
      { jenisBarang: 'Bumbu Dapur' }
    }).subscribe((results) => {

      for (let i = 0; i < results.length; i++) {
        this.ajiuser.findById(results[i]['idSeller']).subscribe((result) => {
          results[i]['namaLengkap'] = result['namaLengkap'];
        })
      }
      this.bumbu = results;
      this.bumbuLength = this.bumbu.length;
      loading.dismiss();
    })
  }

  detail(bumbus) {
    console.log(bumbus, 'Data Barang');
    this.navCtrl.push('DetailBarang', {
      idBarang: bumbus.idBarang,
      photo: bumbus.photo,
      namaBarang: bumbus.namaBarang,
      date: bumbus.createTanggal,
      idSeller: bumbus.idSeller,
      jenisSayuran: bumbus.jenisBarang,
      deskripsi: bumbus.deskripsi,
      harga: bumbus.harga
    });
  }

}
