import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiPostingApi } from './../../../shared/sdk/services/custom/AjiPosting';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';

/**
 * Generated class for the UnggasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-unggas',
  templateUrl: 'unggas.html',
})
export class UnggasPage {
  public unggas: any;
  public loopBack: any;
  public unggasLength: any;
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
      { jenisBarang: 'Unggas' }
    }).subscribe((results) => {

      for (let i = 0; i < results.length; i++) {
        this.ajiuser.findById(results[i]['idSeller']).subscribe((result) => {
          results[i]['namaLengkap'] = result['namaLengkap'];
        })
      }
      this.unggas = results;
      this.unggasLength = this.unggas.length;
      loading.dismiss();
    })
  }

  detail(unggass) {
    console.log(unggass, 'Data Barang');
    this.navCtrl.push('DetailBarang', {
      idBarang: unggass.idBarang,
      photo: unggass.photo,
      namaBarang: unggass.namaBarang,
      date: unggass.createTanggal,
      idSeller: unggass.idSeller,
      jenisSayuran: unggass.jenisBarang,
      deskripsi: unggass.deskripsi,
      harga: unggass.harga
    });
  }

}
