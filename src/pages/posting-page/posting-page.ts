import { TranslateService } from '@ngx-translate/core';
import { HomePage } from './../home/home';
import { LoopBackConfig } from './../../shared/sdk/lb.config';
import { AjiPostingApi } from './../../shared/sdk/services/custom/AjiPosting';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';

/**
 * Generated class for the PostingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-posting-page',
  templateUrl: 'posting-page.html',
})
export class PostingPage {
  public role: any;
  public idUser: any;

  public dataAji: any = {};
  public photo: any;

  public idSeller: any;
  public createTanggal: any;
  public namaBarang: any;
  public tanaman: any;
  public harga: any;
  public deskripsi: any;
  public stock: any;

  public fileName: any;

  public dateNow: any;
  public CurrentDate: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public AjiPosting: AjiPostingApi,
    public translate: TranslateService,
    public transfer: Transfer,
  ) {
    this.dateNow = this.formatDate();

    this.role = this.navParams.get('role');
    console.log(this.role, 'RoleUser');

    this.idUser = this.navParams.get('idUser');
    console.log(this.idUser, 'IdUser');

  }

  ionViewDidLoad() {

  }

  shoot() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 1024,
      targetHeight: 1024
    }

    this.camera.getPicture(options).then((imageData) => {
      this.photo = imageData;
      this.upload(this.photo);
    }, (err) => {
      console.log(err);

      let alert = this.alertCtrl.create({
        subTitle: (err == 'Camera cancelled.') ? 'Camera cancelled.' : "Can't access camera.",
        buttons: [
          {
            text: 'Dismiss',
            handler: () => {
            }
          }]
      });
      alert.present();

    });
  }

  public upload(photo) {
    this.fileName = UUID.UUID() + '.jpg';

    const options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.fileName,
      chunkedMode: false,
      mimeType: 'image/jpg'
    };

    const fileTransfer: TransferObject = this.transfer.create();

    return fileTransfer.upload(photo, LoopBackConfig.getPath() + '/api/containers/Rendy/upload', options)
      .then((data) => {
        console.log(data, 'Data')
        console.log('Sukses Upload Foto')

      });
  }


  formatDate() {
    let d = new Date();
    this.CurrentDate = moment(d).format('YYYY-MM-DD');

    return this.CurrentDate;
  }

  posting() {
    console.log('posting');
    this.idSeller = this.idUser;
    this.namaBarang = this.dataAji['namaBarang'];
    this.tanaman = this.dataAji['tanaman'];
    this.stock = this.dataAji['stock'];
    this.deskripsi = this.dataAji['deskripsi'];
    this.harga = this.dataAji['harga'];
    this.role = this.role;

    this.AjiPosting.create({
      idSeller: this.idSeller,
      createTanggal: this.dateNow,
      namaBarang: this.namaBarang,
      jenisBarang: this.tanaman,
      photo: this.fileName,
      harga: this.harga,
      deskripsi: this.deskripsi,
      role: this.role,
      stock: this.stock
    }).subscribe((res) => {
      console.log('Sukses Posting');

      let alert = this.alertCtrl.create({
        subTitle: this.translate.instant('Success Selling'),
        buttons: [
          {
            text: this.translate.instant('Dismiss'),
            handler: () => {
              this.navCtrl.setRoot(HomePage);
            }
          }]
      });
      alert.present();
    }, (error) => {
      console.log(error, 'Failed Posting');
      let alert = this.alertCtrl.create({
        subTitle: this.translate.instant('Please, Complete your Form'),
        buttons: [
          {
            text: 'Dismiss',
            handler: () => {
              
            }
          }]
      });
      alert.present();
    });
  }

}
