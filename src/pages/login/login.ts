import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.push(MenuPage);
  }
}
