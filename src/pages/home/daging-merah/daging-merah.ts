import { TranslateService } from '@ngx-translate/core';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiPostingApi } from './../../../shared/sdk/services/custom/AjiPosting';

/**
 * Generated class for the DagingMerahPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-daging-merah',
  templateUrl: 'daging-merah.html',
})
export class DagingMerahPage {
  public daging: any;
  public dagingLength: any;
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
      { jenisBarang: 'Daging Merah' }
    }).subscribe((results) => {

      for (let i = 0; i < results.length; i++) {
        this.ajiuser.findById(results[i]['idSeller']).subscribe((result) => {
          results[i]['namaLengkap'] = result['namaLengkap'];
        })
      }
      this.daging = results;
      this.dagingLength = this.daging.length;
      loading.dismiss();
    })
  }

  detail(dagings) {
    console.log(dagings, 'Data Barang');
    this.navCtrl.push('DetailBarang', {
      idBarang: dagings.idBarang,
      photo: dagings.photo,
      namaBarang: dagings.namaBarang,
      date: dagings.createTanggal,
      idSeller: dagings.idSeller,
      jenisSayuran: dagings.jenisBarang,
      deskripsi: dagings.deskripsi,
      harga: dagings.harga
    });
  }

}
