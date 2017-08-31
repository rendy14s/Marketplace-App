// import { RealTime } from './../../../shared/sdk/services/core/real.time';
import { LoggerService } from './../../../shared/sdk/services/custom/logger.service';
import { Subscription } from 'rxjs/Subscription';
import { Storage } from '@ionic/storage';
import { AjiChatheaderApi } from './../../../shared/sdk/services/custom/AjiChatheader';
import { AjiUserAuthApi } from './../../../shared/sdk/services/custom/AjiUserAuth';
import { AjiChatApi } from './../../../shared/sdk/services/custom/AjiChat';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { RealTime } from './../../../shared/sdk/services/core/real.time';
/**
 * Generated class for the ChatRoomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  chats: any = [];

  public newMessage: any;
  public from: any;
  public to: any;
  public header: any;

  public idFrom: any;
  public idTo: any;
  public nameFrom: any;
  public nameTo: any;

  public user: any;
  public data: any;
  public dataTemp;

  public dataChat: any;

  public reload: any;

  public arr: any;
  public idGet: any;
  public nameGet: any;

  public status: boolean;
  public isMe: any;
  public dataLogin: any;

  public viewNama: any;
  public subscriptions: Array<Subscription> = [];
  private scrollSpeed = 300;

  @ViewChild('txtChat') txtChat: any;
  @ViewChild('content') content: any;

  public isIos = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertController,
    public storage: Storage,
    public ajichat: AjiChatApi,
    public ajiuser: AjiUserAuthApi,
    public ajichatheader: AjiChatheaderApi,
    public loadingCtrl: LoadingController,
    public events: Events,
    private platform: Platform,
    private keyboard: Keyboard,
    private realTime: RealTime,
    private logger: LoggerService,
  ) {

    if (this.platform.is('ios')) {
      this.isIos = true;
    } else {
      this.keyboard.onKeyboardShow()
        .subscribe(() => {
          this.content.scrollToBottom(this.scrollSpeed);
        });
    }

    this.data = this.navParams.get('data');
    console.log(this.data, 'Data Get')

    this.arr = this.navParams.get('datax');
    console.log(this.arr, 'Data Lemparan');

    this.storage.get('loginAuth').then((loginAuth) => {
      this.dataLogin = loginAuth;
      this.user = loginAuth.namaLengkap;
      this.idFrom = loginAuth.id;

      if (this.data != null || this.data != undefined) {
        this.idGet = this.data.id;
        this.nameGet = this.data.namaLengkap;
        this.header = this.idFrom + '_' + this.idGet;
        this.idTo = this.idGet;
        this.status = true;
      
        this.declareChat();
        this.startEmit();

      } else {
        if (this.arr.createdFirst == this.idFrom) {
          this.idTo = this.arr.createdSecond;
        } else if (this.arr.createdFirst != this.idFrom) {
          this.idTo = this.arr.createdFirst;
        }
        this.header = this.arr.headerChat;
        this.nameGet = this.arr.toname;

        this.declareChat();
        this.startEmit();
      }
    })
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.content.scrollToBottom(this.scrollSpeed);
    }, 500);
  }

  ionViewDidLeave(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  send() {
    const newMessage = this.txtChat.content;
    console.log(newMessage, 'Pesan');
    this.ajichat.create({
      headerChat: this.header,
      fromid: this.idFrom,
      toid: this.idTo,
      chat: newMessage,
      fromname: this.user,
      toname: this.nameGet
    }).subscribe((result) => {
      this.txtChat.content = '';
      this.newMessage = '';
      console.log('Send Chat Message');
      if (this.status == true) {
        this.ajichatheader.create({
          headerChat: this.header,
          createdFirst: this.idFrom,
          createdSecond: this.idTo,
          fromname: this.user,
          toname: this.nameGet
        }).subscribe((res) => {
          console.log('Sukses Chat Header')
          this.content.scrollToBottom(this.scrollSpeed);
          this.keyboard.show();
          this.txtChat.clearInput();
          this.txtChat.setFocus();
          this.txtChat.content = '';
          this.events.subscribe('list:update');
        })
      }

    })
  }

  public declareChat(): void {
    this.subscriptions.push(
      this.realTime.onReady().subscribe(() => {
        this.realTime.IO.on('CHAT' + this.header)
          .subscribe((result) => {

            this.dataChat = JSON.parse(result);
      
            for (let i = 0; i < this.dataChat.length; i++) {
              if (this.dataChat[i]['fromid'] == this.idFrom) {
                this.isMe = true;
              } else {
                this.isMe = false;
              }
              this.dataChat[i].isMe = this.isMe;
              console.log(this.dataChat, 'Chat Server');
            }

          }, (error) => {
            console.log(error);
          })
      })
    );
  }

  public startEmit() {
    this.ajichat.find({
      where:
      { headerChat: this.header }
    }).subscribe((result) => {
      this.dataChat = result;
      for (let i = 0; i < this.dataChat.length; i++) {
        if (this.dataChat[i]['fromid'] == this.idFrom) {
          this.isMe = true;
        } else {
          this.isMe = false;
        }
        this.dataChat[i].isMe = this.isMe;
      }
      this.content.scrollToBottom(this.scrollSpeed);
    })
  }
}