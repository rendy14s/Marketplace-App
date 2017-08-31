import { ListPage } from './../pages/list/list';
import { SDKBrowserModule } from './../shared/sdk/index';
import { UserProviders } from './../providers/user.providers';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
// import { ChatBubbleComponent } from '../components/chat-bubble/chat-bubble';
// import { ElasticTextareaComponent } from '../components/elastic-textarea/elastic-textarea';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { OneSignal } from '@ionic-native/onesignal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { Keyboard } from '@ionic-native/keyboard';
import { Ionic2RatingModule } from 'ionic2-rating';
import { FormsModule } from '@angular/forms';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ], 
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SDKBrowserModule.forRoot(),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    Ionic2RatingModule,
    IonicModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  
  providers: [
    StatusBar,
    UserProviders,
    Camera,
    File,
    FileOpener,
    SplashScreen,
    Keyboard,
    Transfer,
    OneSignal,
    PhotoViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    
  ]
})
export class AppModule {}
