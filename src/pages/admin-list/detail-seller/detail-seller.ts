import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailSellerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-seller',
  templateUrl: 'detail-seller.html',
})
export class DetailSellerPage {
  public datas: any;

  public nama: any;
  public alamat: any;
  public jenisKelamin: any;
  public ttl: any;
  public notelp: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: TranslateService
  ) {
    this.datas = this.navParams.get('data');
    console.log(this.datas)

   this.nama = this.datas.namaLengkap;
   this.alamat = this.datas.alamat;
   this.jenisKelamin = this.datas.jenisKelamin;
   this.ttl = this.datas.ttl;
   this.notelp = this.datas.noTelp;
  }

  ionViewDidLoad() {
    
  }

}
