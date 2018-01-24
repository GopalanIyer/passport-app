import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any = LoginPage;
  exit: boolean = false;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    afAuth: AngularFireAuth,
    toastCtrl: ToastController,
    app: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      platform.registerBackButtonAction(() => {
        if (app.getActiveNavs()[0].getActive().name != 'LoadingPage') {
          if (this.exit == true) {
            platform.exitApp();
          }
          else {
            this.exit = true;
            toastCtrl.create({
              message: 'Press back again to exit',
              duration: 2000,
              showCloseButton: true,
              closeButtonText: 'Close',
            }).present();
            setTimeout(_ => {
              this.exit = false;
            }, 2000)
          }
        }
      })

      afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          console.log("Login");
          this.navCtrl.setRoot(HomePage);
        }
        else {
          console.log("Logout");
          this.navCtrl.setRoot(LoginPage);
        }
      })
    });
  }
}
