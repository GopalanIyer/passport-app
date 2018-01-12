import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage:any = HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  goToPersonal(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TabsControllerPage);
  }
}
