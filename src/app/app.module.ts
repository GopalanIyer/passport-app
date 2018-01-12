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
    IonicModule.forRoot(MyApp)
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}