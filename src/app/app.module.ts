import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PersonalPage } from '../pages/personal/personal';
import { WitnessesPage } from '../pages/witnesses/witnesses';
import { OtherPage } from '../pages/other/other';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { FamilyPage } from '../pages/family/family';
import { PaymentPage } from '../pages/payment/payment';
import { Dialogs } from "@ionic-native/dialogs";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuPage } from '../pages/menu/menu';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule, AngularFireDatabase } from "angularfire2/database";
import { ConfirmPage } from '../pages/confirm/confirm';
import { DocumentsPage } from '../pages/documents/documents';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { Base64 } from "@ionic-native/base64";
import { SignaturePadModule } from "angular2-signaturepad";
import { FilePath } from '@ionic-native/file-path';
import { AngularFireStorageModule } from 'angularfire2/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyCBOff3pTDmMfDAvlxH8voyxGXY9sW5E0M",
  authDomain: "passport-app-54783.firebaseapp.com",
  databaseURL: "https://passport-app-54783.firebaseio.com",
  projectId: "passport-app-54783",
  storageBucket: "passport-app-54783.appspot.com",
  messagingSenderId: "293747294657"
};

@NgModule({
  declarations: [
    MyApp,
    PersonalPage,
    WitnessesPage,
    OtherPage,
    TabsControllerPage,
    LoginPage,
    HomePage,
    FamilyPage,
    PaymentPage,
    MenuPage,
    ConfirmPage,
    DocumentsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    SignaturePadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PersonalPage,
    WitnessesPage,
    OtherPage,
    TabsControllerPage,
    LoginPage,
    HomePage,
    FamilyPage,
    PaymentPage,
    MenuPage,
    ConfirmPage,
    DocumentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    AngularFireDatabase,
    Camera,
    FileChooser,
    Base64,
    FilePath,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }