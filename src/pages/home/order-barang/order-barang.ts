import { TranslateService } from '@ngx-translate/core';
import { AjiPostingApi } from './../../../shared/sdk/services/custom/AjiPosting';
import { LoopBackConfig } from './../../../shared/sdk/lb.config';
import { ListPage } from './../../list/list';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AjiOrderApi } from './../../../shared/sdk/services/custom/AjiOrder';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { UUID } from 'angular2-uuid';

/**
 * Generated class for the OrderBarang page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-barang',
  templateUrl: 'order-barang.html',
})
export class OrderBarang {

  public slider: any = 1;
  public qty: any;
  public cash: any;

  public idBarang: any;
  public idCustomer: any;
  public defaultPhoto: any;
  public photo: any;
  public namaBarang: any;
  public date: any;
  public idSeller: any;
  public jenisSayuran: any;
  public deskripsi: any;
  public harga: any;
  public nama: any;
  public stok: any;

  public stokId: any;

  public Tot: number = 0;

  public cust: any = {};
  public alamat: any;

  public cod: boolean = false;
  public wallet: boolean = false;
  public bank: boolean = false;

  public idMember: any;

  public cods: any;
  public wallets: any;
  public banks: any;

  public payment: any;
  public balance: any;
  public bayaranLu: any;
  public loopbackPath: string = LoopBackConfig.getPath();
  public imageData: any;
  public option: any;

  public loopback: any;
  public fileName: any;
  public numberBank: any;
  public ren: any;

  public hoy: any;
  public toBank: any;
  public stokAwal: any;
  public stokAkhir: any;
  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public storage: Storage,
    public nav: Nav,
    public ajiorder: AjiOrderApi,
    private camera: Camera,
    public alertCtrl: AlertController,
    public ajiauth: AjiUserAuthApi,
    public transfer: Transfer,
    public loadingCtrl: LoadingController,
    public ajiposting: AjiPostingApi,
    public translate: TranslateService
  ) {

    this.loopback = LoopBackConfig.getPath() + '/api/containers/Rendy/download/';
    this.qtyOrder();

    this.storage.ready().then(() => {
      this.storage.get('loginAuth').then(hasil => {
        this.idCustomer = hasil.id;
        if (hasil != null && hasil != undefined) {
          console.log('Login true');
        } else {
          console.log('Login false');
          this.nav.setRoot('LoginPage');
        }
      });
    });
  }

  ionViewDidLoad() {
    this.idBarang = this.params.get('idBarang');
    this.photo = this.params.get('photo');
    console.log(this.photo, 'poto');
    if (this.photo == '' || this.photo == undefined) {
      this.defaultPhoto = 'assets/images/no_photo.jpg';
    } else {
      this.defaultPhoto = this.photo;
    }

    this.ajiposting.findById(this.idBarang).subscribe((result) => {
      console.log(result, 'resultnya barang');
      this.stokId = result;
      this.stok = this.stokId.stock
    })

    this.namaBarang = this.params.get('namaBarang');
    console.log(this.namaBarang);
    this.date = this.params.get('date');
    this.idSeller = this.params.get('idSeller');
    this.jenisSayuran = this.params.get('jenisSayuran');
    this.deskripsi = this.params.get('deskripsi');
    this.harga = this.params.get('harga');
    this.nama = this.params.get('nama');

    this.storage.ready().then(() => {
      this.storage.get('loginAuth').then((loginAuth) => {
        this.idMember = loginAuth.id;
        this.ajiauth.findOne({
          where:
          { id: this.idMember }
        }).subscribe((result) => {
          this.cash = result['topup'];
          console.log(this.cash, 'cassshhh');

          this.ajiauth.findOne({
            where:
            { id: this.idSeller }
          }).subscribe((put) => {
            this.hoy = put;
            this.numberBank = this.hoy.bank;
          })
        })
      });
    });
  }

  order() {
    let loading = this.loadingCtrl.create({
      content: this.translate.instant('Please wait Please...')
    });

    this.alamat = this.cust['alamat'];

    if (this.qty > this.stok) {
      let alert = this.alertCtrl.create({
        subTitle: this.translate.instant('Sorry, your order out of Stock'),
        buttons: ['OK']
      });
      alert.present();
    } else {
      if (this.alamat == null || this.alamat == undefined) {
        let alert = this.alertCtrl.create({
          subTitle: this.translate.instant('Address must be input'),
          buttons: ['OK']
        });
        alert.present();
      } else {

        let sum: any;
        sum = this.harga * this.qty;

        console.log(this.cust['wallet'], 'wallet');
        this.bayaranLu = this.cust['nominal'];
        if (this.cust['wallet'] == true) {
          console.log(this.cash + ' && ' + sum);
          if (sum > this.cash) {
            let alert = this.alertCtrl.create({
              subTitle: this.translate.instant('Your wallet balance not enough for order. please top up your wallet'),
              buttons: ['OK']
            });
            alert.present();
          } else {
            let dateOrder: any;
            dateOrder = new Date();

            let approval: any = 'Waiting approval from seller';

            this.alamat = this.cust['alamat'];
            this.toBank = this.cust['bank'];
            // this.bayaranLu = this.cust['nominal'];
            if (this.cust['cod'] == true) {
              this.payment = 'COD';
              this.balance = this.cust['nominal'];
            } else if (this.cust['wallet'] == true) {
              this.payment = 'My Wallet';
              this.balance = this.cash;
            } else if (this.cust['bank'] == true) {
              this.payment = 'Transfer Bank';
              this.balance = this.cust['nominal'];
            }
            loading.present();

            this.ajiorder.create({
              idBarang: this.idBarang,
              idSeller: this.idSeller,
              idCustomer: this.idCustomer,
              tanggalOrder: dateOrder,
              namaBarang: this.namaBarang,
              photoBarang: this.defaultPhoto,
              jenisBarang: this.jenisSayuran,
              harga: this.harga,
              jumlahBarang: this.qty,
              totalHarga: sum,
              alamat: this.alamat,
              status: approval,
              payment: this.payment,
              paymentTot: this.balance,
              bank: this.toBank
            }).subscribe(result => {
              loading.dismiss();
              this.ajiposting.findOne({
                where:
                { idBarang: this.idBarang }
              }).subscribe((res) => {
                this.ren = res;
                this.stokAwal = this.ren.stock;
                this.stokAkhir = parseInt(this.stokAwal) - parseInt(this.qty);

                this.ajiposting.updateAll({ idBarang: this.idBarang }, { stock: this.stokAkhir }).subscribe((sut) => {
                  if (sut) {
                    console.log('SUCCESS', result);
                    const alert = this.alertCtrl.create({
                      subTitle: this.translate.instant('Successfull Order'),
                      buttons: [{
                        text: 'OK',
                        handler: () => {
                          loading.dismiss();
                          this.navCtrl.setRoot(ListPage);
                        }
                      }]
                    });
                    alert.present();

                  } else {
                    console.log('FAILED', result);
                    const alert = this.alertCtrl.create({
                      subTitle: this.translate.instant('There was an error occured'),
                      buttons: [{
                        text: 'OK',
                        handler: () => {
                          this.navCtrl.pop();
                        }
                      }]
                    });
                    alert.present();
                  }
                })
              })
            }, error => {
              console.log(error);
              loading.dismiss();
            })
          }
        } else {
          console.log(this.bayaranLu, 'Bayaran lu');
          console.log(this.Tot, 'Total bayar');
          if (this.bayaranLu > this.Tot) {
            const alert = this.alertCtrl.create({
              subTitle: this.translate.instant('Your payment biggest of Ammount'),
              buttons: [{
                text: 'Dismiss',
                handler: () => {
                }
              }]
            });
            alert.present();
          } else if (this.bayaranLu < this.Tot) {
            const alert = this.alertCtrl.create({
              subTitle: this.translate.instant('Your payment lowest of Ammount'),
              buttons: [{
                text: this.translate.instant('Dismiss'),
                handler: () => {
                }
              }]
            });
            alert.present();
          } else if (this.bayaranLu == this.Tot) {
            let dateOrder: any;
            dateOrder = new Date();

            let approval: any = 'Waiting approval from seller';

            this.alamat = this.cust['alamat'];

            if (this.cust['cod'] == true) {
              this.payment = 'COD';
              this.balance = this.cust['nominal'];
            } else if (this.cust['wallet'] == true) {
              this.payment = 'My Wallet';
              this.balance = this.cash;
            } else if (this.cust['bank'] == true) {
              this.payment = 'Transfer Bank';
              this.balance = this.cust['nominal'];
            }
            loading.present();

            this.ajiorder.create({
              idBarang: this.idBarang,
              idSeller: this.idSeller,
              idCustomer: this.idCustomer,
              tanggalOrder: dateOrder,
              namaBarang: this.namaBarang,
              photoBarang: this.defaultPhoto,
              jenisBarang: this.jenisSayuran,
              harga: this.harga,
              jumlahBarang: this.qty,
              totalHarga: sum,
              alamat: this.alamat,
              status: approval,
              payment: this.payment,
              paymentTot: this.balance
            }).subscribe(result => {
              loading.dismiss();
              if (result) {
                console.log('SUCCESS', result);
                const alert = this.alertCtrl.create({
                  subTitle: this.translate.instant('Successfull Order'),
                  buttons: [{
                    text: 'OK',
                    handler: () => {
                      this.navCtrl.setRoot(ListPage);
                    }
                  }]
                });
                alert.present();

              } else {
                console.log('FAILED', result);
                const alert = this.alertCtrl.create({
                  subTitle: this.translate.instant('There was an error occured'),
                  buttons: [{
                    text: 'OK',
                    handler: () => {
                      this.navCtrl.pop();
                    }
                  }]
                });
                alert.present();
              }
            }, error => {
              console.log(error);
              loading.dismiss();
            })
          }
        }
      }
    }
  }
  qtyOrder() {
    const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
      23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
      47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
      71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94,
      95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
      115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134,
      135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154,
      155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174,
      175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194,
      195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214,
      215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234,
      235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254,
      255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274,
      275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294,
      295, 296, 297, 298, 299, 300];

    this.qty = steps[this.slider];
    this.Tot = parseInt(this.harga) * parseInt(this.qty);
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
            text: this.translate.instant('Dismiss'),
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
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
  }
}
