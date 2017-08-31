import { TranslateService } from '@ngx-translate/core';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailOrder page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-order',
  templateUrl: 'detail-order.html',
})
export class DetailOrder {
  public name: any;
  public barang: any;
  public photo: any;
  public date: any;
  public jenisBarang: any;
  public qty: any;
  public alamat: any;
  public totalHarga: any;
  public loopBack: any;
  public idSeller: any;
  public namaSeller: any;
  public hasil: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public params: NavParams,
    public ajiuser: AjiUserAuthApi,
    public translate: TranslateService
    ) {
      this.loopBack = LoopBackConfig.getPath() + '/api/containers/Rendy/download/';
      
      this.name = this.params.get('nama');
      this.barang = this.params.get('barang');
      this.photo = this.params.get('photo');
      this.date = this.params.get('date');
      this.jenisBarang = this.params.get('jenisBarang');
      this.qty = this.params.get('qty');
      this.alamat = this.params.get('alamat');
      this.totalHarga = this.params.get('totalHarga');
      this.idSeller = this.params.get('idSeller');
  }

  ionViewDidLoad() {
    console.log(this.idSeller, 'Id Seller');
    this.ajiuser.findOne({
      where:
      { idSeller: this.idSeller }
    }).subscribe((result) => {
      console.log(result);
      this.hasil = result;
      this.namaSeller = this.hasil.namaLengkap;
    })
  }

}
