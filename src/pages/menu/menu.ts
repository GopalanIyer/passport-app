import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { App } from 'ionic-angular/components/app/app';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage: any = HomePage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appCtrl: App,
    private afAuth: AngularFireAuth,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  goToPersonal() {
    this.appCtrl.getRootNavs()[0].push(TabsControllerPage);
  }

  goToHome() {
    this.appCtrl.getRootNavs()[0].push(MenuPage);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
