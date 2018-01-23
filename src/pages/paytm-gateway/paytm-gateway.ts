import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaytmGatewayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paytm-gateway',
  templateUrl: 'paytm-gateway.html',
})
export class PaytmGatewayPage {

  amount = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaytmGatewayPage');
  }

  pay() {
    console.log("Pay Rs. ", this.amount);
    
  }

}
