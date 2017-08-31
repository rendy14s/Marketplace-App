import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiPostingApi } from './../../../shared/sdk/services/custom/AjiPosting';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';

/**
 * Generated class for the SayurMayurPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sayur-mayur',
  templateUrl: 'sayur-mayur.html',
})
export class SayurMayurPage {
  public loopBack: any;
  public sayur: any;
  public sayurLength;
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
      { jenisBarang: 'Sayur Mayur' }
    }).subscribe((results) => {

      for (let i = 0; i < results.length; i++) {
        this.ajiuser.findById(results[i]['idSeller']).subscribe((result) => {
          results[i]['namaLengkap'] = result['namaLengkap'];
        })
      }
      this.sayur = results;
      this.sayurLength = this.sayur.length;
      loading.dismiss();
    })
  }

  detail(sayurs) {
    console.log(sayurs, 'Data Barang');
    this.navCtrl.push('DetailBarang', {
      idBarang: sayurs.idBarang,
      photo: sayurs.photo,
      namaBarang: sayurs.namaBarang,
      date: sayurs.createTanggal,
      idSeller: sayurs.idSeller,
      jenisSayuran: sayurs.jenisBarang,
      deskripsi: sayurs.deskripsi,
      harga: sayurs.harga
    });
  }

}
