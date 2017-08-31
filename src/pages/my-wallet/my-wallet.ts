import { TranslateService } from '@ngx-translate/core';
import { LoopBackConfig } from './../../shared/sdk/lb.config';
import { AjiUserAuthApi } from './../../shared/sdk/services/custom/AjiUserAuth';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UUID } from 'angular2-uuid';


// import { Events } from 'ionic-angular';
/**
 * Generated class for the MyWallet page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-wallet',
  templateUrl: 'my-wallet.html',
})
export class MyWallet {
  public cash: any;
  public idMember: number;

  public photo: any;
  public fileName: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public alertCtrl: AlertController,
    public storage: Storage,
    public ajiauth: AjiUserAuthApi,
    public transfer: Transfer,
    public translate: TranslateService
  ) {


  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('loginAuth').then((loginAuth) => {
        this.idMember = loginAuth.id;
        console.log(this.idMember, 'id nya');
        this.ajiauth.findOne({
          where:
          { id: this.idMember }
        }).subscribe((result) => {
          this.cash = result['topup'];
          console.log(this.cash, 'cassshhh');
        })
      });
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
        console.log(data, 'Data')
        console.log('Sukses Upload Foto')
        this.navCtrl.push('DetailPaymentPage', { photo: photo, imageData: photo, options: options, fileName: this.fileName, cash: this.cash, idMember: this.idMember })
      });
  }

  public listWallet() {
    this.navCtrl.push('ListTopupPage');
  }

}
