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
    MenuPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
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
    MenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }