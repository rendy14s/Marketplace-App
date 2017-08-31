import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiPostingApi } from './../../../shared/sdk/services/custom/AjiPosting';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';

/**
 * Generated class for the HewaniLautPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hewani-laut',
  templateUrl: 'hewani-laut.html',
})
export class HewaniLautPage {
  public hewani: any;
  public loopBack: any;
  public hewaniLength: any;
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
      { jenisBarang: 'Hewani Laut' }
    }).subscribe((results) => {

      for (let i = 0; i < results.length; i++) {
        this.ajiuser.findById(results[i]['idSeller']).subscribe((result) => {
          results[i]['namaLengkap'] = result['namaLengkap'];
        })
      }
      this.hewani = results;
      this.hewaniLength = this.hewani.length;
      loading.dismiss();
    })
  }

  detail(hewanis) {
    console.log(hewanis, 'Data Barang');
    this.navCtrl.push('DetailBarang', {
      idBarang: hewanis.idBarang,
      photo: hewanis.photo,
      namaBarang: hewanis.namaBarang,
      date: hewanis.createTanggal,
      idSeller: hewanis.idSeller,
      jenisSayuran: hewanis.jenisBarang,
      deskripsi: hewanis.deskripsi,
      harga: hewanis.harga
    });
  }

}
