import { TranslateService } from '@ngx-translate/core';
import { AjiPostingApi } from './../../../shared/sdk/services/custom/AjiPosting';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UUID } from 'angular2-uuid';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

/**
 * Generated class for the EditPostingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-posting',
  templateUrl: 'edit-posting.html',
})
export class EditPostingPage {
  public datas: any;
  public loopBack: any;

  public photo: any;
  public namaBarang: any;
  public deskripsi: any;
  public harga: any;
  public stock: any;
  public fileName: any;

  public editData: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajiposting: AjiPostingApi,
    public events: Events,
    public alertCtrl: AlertController,
    public camera: Camera,
    public translate: TranslateService,
    private transfer: Transfer
  ) {
    this.loopBack = LoopBackConfig.getPath() + '/api/containers/Rendy/download/';
  }

  ionViewDidLoad() {
    this.datas = this.navParams.get('data');
    console.log(this.datas);

    this.photo = this.datas.photo;
    this.editData['namaBarang'] = this.datas.namaBarang;
    this.editData['deskripsi'] = this.datas.deskripsi;
    this.editData['harga'] = this.datas.harga;
    this.editData['stock'] = this.datas.stock;
  }

  public save() {
    const newData = this.editData;
    console.log(newData, 'NewData');

    this.ajiposting.updateAll({ idSeller: this.datas.idSeller }, newData).subscribe((result) => {
      console.log(result, 'Result');
      this.events.publish('update:list');
      let alert = this.alertCtrl.create({
        subTitle: this.translate.instant('Success Update'),
        buttons: ['Dismiss']
      });
      alert.present();
    });
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
        console.log(data, 'Data');
        console.log('Sukses Upload Foto');
        this.ajiposting.updateAll({ idSeller: this.datas.idSeller }, { photo: this.fileName}).subscribe((result) => {
          console.log('Sukses Update Photo');
          this.events.publish('update:list');
        });
      });
  }

}
