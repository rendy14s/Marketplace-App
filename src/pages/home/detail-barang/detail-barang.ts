import { TranslateService } from '@ngx-translate/core';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailBarang page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-barang',
  templateUrl: 'detail-barang.html',
})
export class DetailBarang {
  public idBarang: any;
  public defaultPhoto: any;
  public photo: any;
  public namaBarang: any;
  public date: any;
  public idSeller: any;
  public jenisSayuran: any;
  public deskripsi: any;
  public harga: any;
  public nama: any;
  
  public loopback: any;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public ajiauth: AjiUserAuthApi,
    public translate: TranslateService
  ) {
    this.loopback = LoopBackConfig.getPath() + '/api/containers/Rendy/download/';

    this.idBarang = this.params.get('idBarang');
    this.photo = this.params.get('photo');
    console.log(this.photo, 'poto');
    if (this.photo == '' || this.photo == undefined) {
      this.defaultPhoto = 'assets/images/no_photo.jpg';
    } else {
      this.defaultPhoto = this.photo;
    }

    this.namaBarang = this.params.get('namaBarang');
    console.log(this.namaBarang);
    this.date = this.params.get('date');
    this.idSeller = this.params.get('idSeller');
    this.jenisSayuran = this.params.get('jenisSayuran');
    this.deskripsi = this.params.get('deskripsi');
    this.harga = this.params.get('harga');
  }

  ionViewDidLoad() {
    console.log(this.idSeller, 'idddd');
    
    let sellerId = this.idSeller;
    this.ajiauth.findById(sellerId).subscribe((result) => {
      console.log(result, '111');
      this.nama = result['namaLengkap'];
    })
  }

  order() {
    console.log('Order Barang Klik');
    this.navCtrl.push('OrderBarang', {
      idBarang: this.idBarang,
      photo: this.defaultPhoto,
      namaBarang: this.namaBarang,
      date: this.date,
      idSeller: this.idSeller,
      jenisSayuran: this.jenisSayuran,
      deskripsi: this.deskripsi,
      harga: this.harga,
      nama: this.nama
    })
  }

}
