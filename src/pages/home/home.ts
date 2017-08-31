import { LoopBackConfig } from './../../shared/sdk/lb.config';
import { AjiPostingApi } from './../../shared/sdk/services/custom/AjiPosting';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public role: any;
  public idUser: any;

  public sayuranLength: any;
  public sayuran: any;
  public loopBack: any;
  public custDiv: boolean;
  public sellerDiv: boolean;
  public adminDiv: boolean;
  constructor(
    public navCtrl: NavController,
    public modal: ModalController,
    public storage: Storage,
    public AjiPostingApi: AjiPostingApi,
    private loadingCtrl: LoadingController
  ) {
    this.loopBack = LoopBackConfig.getPath() + '/api/containers/Rendy/download/';

    this.storage.get('loginAuth').then((loginAuth)=>{
      console.log(loginAuth, 'Data Login');
      this.role = loginAuth.hakUser;
      this.idUser = loginAuth.id;
      console.log(this.role, 'RoleNya');
      if(this.role == 'seller'){
        this.custDiv = true;
        this.sellerDiv = false;
        this.adminDiv = true;
      }else if(this.role == 'admin'){
        this.custDiv = true;
        this.sellerDiv = true;
        this.adminDiv = false;
      } else {
        this.custDiv = false;
        this.sellerDiv = true;
        this.adminDiv = true;
      }
    });
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Retreive Post...'
    });
    loading.present();
    this.AjiPostingApi.find({
      where: {
        and: [
          { role: 'seller' },
        ]
      },
      order: "reputasi DESC",
    }).subscribe((result) => {
      this.sayuran = result;
      this.sayuranLength = this.sayuran.length;
      console.log(result, 'Data Posting');
      loading.dismiss();
    });
  }


  detail(post) {
    console.log('Detail Barang Klik');
    console.log(post, 'Data Barang');
    this.navCtrl.push('DetailBarang', {
      idBarang: post.idBarang,
      photo: post.photo,
      namaBarang: post.namaBarang,
      date: post.createTanggal,
      idSeller: post.idSeller,
      jenisSayuran: post.jenisBarang,
      deskripsi: post.deskripsi,
      harga: post.harga
    });
  }

  public posting() {
    this.navCtrl.push('PostingPage', { role: this.role, idUser: this.idUser })
  }

  public buah() {
    this.navCtrl.push('BuahPage');
  }

  public bumbu() {
    this.navCtrl.push('BumbuDapurPage');
  }

  public daging() {
    this.navCtrl.push('DagingMerahPage');
  }

  public ikan() {
    this.navCtrl.push('HewaniLautPage');
  }

  public sayur() {
    this.navCtrl.push('SayurMayurPage');
  }

  public unggas() {
    this.navCtrl.push('UnggasPage');
  }

}
