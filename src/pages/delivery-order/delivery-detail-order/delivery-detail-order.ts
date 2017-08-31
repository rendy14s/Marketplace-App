import { TranslateService } from '@ngx-translate/core';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DeliveryDetailOrder page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delivery-detail-order',
  templateUrl: 'delivery-detail-order.html',
})
export class DeliveryDetailOrder {
  public name: any;
  public barang: any;
  public photo: any;
  public date: any;
  public jenisBarang: any;
  public qty: any;
  public alamat: any;
  public totalHarga: any;

  public loopBack: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public params: NavParams,
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryDetailOrder');
  }

}
