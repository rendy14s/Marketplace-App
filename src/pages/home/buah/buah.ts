import { TranslateService } from '@ngx-translate/core';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiPostingApi } from './../../../shared/sdk/services/custom/AjiPosting';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the BuahPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-buah',
  templateUrl: 'buah.html',
})
export class BuahPage {
  public buah: any;
  public buahLength: any;
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
      { jenisBarang: 'Buah - Buahan' }
    }).subscribe((results) => {

      for (let i = 0; i < results.length; i++) {
        this.ajiuser.findById(results[i]['idSeller']).subscribe((result) => {
          results[i]['namaLengkap'] = result['namaLengkap'];
        })
      }
      this.buah = results;
      console.log(this.buah);
      this.buahLength = this.buah.length;
      loading.dismiss();
    })

  }

  detail(buahs) {
    console.log(buahs, 'Data Barang');
    this.navCtrl.push('DetailBarang', {
      idBarang: buahs.idBarang,
      photo: buahs.photo,
      namaBarang: buahs.namaBarang,
      date: buahs.createTanggal,
      idSeller: buahs.idSeller,
      jenisSayuran: buahs.jenisBarang,
      deskripsi: buahs.deskripsi,
      harga: buahs.harga
    });
  }

}
