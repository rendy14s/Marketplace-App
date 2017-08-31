import { AjiAccorderApi } from './../../shared/sdk/services/custom/AjiAccorder';
import { TranslateService } from '@ngx-translate/core';
import { AjiUserAuthApi } from './../../shared/sdk/services/custom/AjiUserAuth';
import { Storage } from '@ionic/storage';

import { AjiOrderProsesApi } from './../../shared/sdk/services/custom/AjiOrderProses';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, AlertController, ToastController } from 'ionic-angular';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare var cordova: any;


/**
 * Generated class for the ReportBudgetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-report-budget',
  templateUrl: 'report-budget.html',
})
export class ReportBudgetPage {

  public optData = {};
  public valueRadio: any;
  public loading: any;
  public reportData: any;
  public idSeller: any;
  public dataList: any;

  public tanggalOrder: any;
  public harga: any;
  public jumlahBarang: any;
  public paymentTot: any;
  public status: any;
  public totalHarga: any;

  public type: any;
  public userName: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ajiorderproses: AjiOrderProsesApi,
    public ajiacc: AjiAccorderApi,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public storage: Storage,
    public ajiauth: AjiUserAuthApi,
    public fileOpener: FileOpener,
    public alertCtrl: AlertController,
    public file: File,
    public toastCtrl: ToastController,
    public translate: TranslateService
  ) {
  }

  ionViewDidLoad() {
    this.storage.get('loginAuth').then((loginAuth) => {
      this.idSeller = loginAuth.id;
      this.userName = loginAuth.namaLengkap
      console.log(this.idSeller, 'ID Seller');
      console.log(this.userName, 'User name');
    })
  }

  loader(): void {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function (row) {
      var dataRow = [];

      columns.forEach(function (column) {
        dataRow.push(row[column].toString());
      })

      body.push(dataRow);
    });

    return body;
  }

  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody(data, columns)
      }
    };
  }

  public testPdf(data, columns) {
    this.loader();
    console.log(this.optData['reptype']);
    if (this.optData['reptype'] == 1) {
      this.type = 'Mingguan';
      console.log(this.type);
    } else if (this.optData['reptype'] == 2) {
      this.type = 'Bulanan';
      console.log(this.type);

    }
    this.ajiacc.find({
      where: {
        and: [
          { status: 'Fully Approved' },
          { idSeller: this.idSeller }
        ]
      }
    }).subscribe((result) => {

      let reportDatas;
      reportDatas = result;

      var tempArr = [];
      for (var i = 0; i < reportDatas.length; i++) {

        tempArr.push(
          {
            tanggalAcc: reportDatas[i].tanggalAcc,
            harga: reportDatas[i].harga,
            jumlahBarang: reportDatas[i].jumlahBarang,
            status: reportDatas[i].status,
            totalHarga: reportDatas[i].totalHarga
          }
        );

        var pdfFile = {
          content: [
            { text: 'REPORT BUDGET', alignment: 'center', style: 'header', fontSize: 35, bold: true },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 3 }] },
            { text: '\n' },
            { text: 'Record date : 07 - 11 - 2017', alignment: 'right', italics: true },
            { text: '\n\n\n' },
            { text: 'Berikut data laporan keuangan ' + this.type, alignment: 'center', style: 'subheader' },
            {
              style: 'tableExample',
              table: {
                body: [
                  [
                    this.table(tempArr, ['tanggalAcc', 'harga', 'jumlahBarang', 'status', 'totalHarga'])
                  ],
                ]
              },
              layout: 'noBorders'
            },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: '\n' },
            { text: 'dicetak oleh Seller: ' + this.userName, alignment: 'right', italics: true },
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10]
            },
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5]
            },
            tableExample: {
              margin: [0, 5, 0, 15]
            },
            tableHeader: {
              bold: true,
              fontSize: 13,
              color: 'black'
            }
          },
          defaultStyle: {
            // alignment: 'justify'
          }
        }
      }

      let makePdf = null;
      makePdf = pdfFile;
      pdfMake.createPdf(makePdf).getBuffer((buffer) => {
        var utf8 = new Uint8Array(buffer); // Convert to UTF-8...
        let binaryArray = utf8.buffer; // Convert to Binary...

        let fileName = "ReportBudget.pdf";
        let saveDir = cordova.file.externalCacheDirectory;

        this.file.createFile(saveDir, fileName, true).then((fileEntry) => {
          fileEntry.createWriter((fileWriter) => {
            fileWriter.onwriteend = () => {
              let toast = this.toastCtrl.create({
                message: 'Sukses Generate to PDF.',
                duration: 2000,
                position: 'bottom'
              });
              toast.onDidDismiss(() => {
                console.log(saveDir + fileName);
                this.fileOpener.open(
                  saveDir + fileName, 'application/pdf');
              });
              toast.present();
            };
            fileWriter.onerror = (e) => {
              console.log('Error, Gagal Generate to PDF: ' + e.toString());
            };
            fileWriter.write(binaryArray);
          });
        });
      });
        this.loading.dismiss();
    })
  }

}
