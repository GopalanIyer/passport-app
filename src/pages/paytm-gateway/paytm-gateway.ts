import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
