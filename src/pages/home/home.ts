import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { PaytmGatewayPage } from '../paytm-gateway/paytm-gateway';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth) {
  }

  goToNewApp(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(TabsControllerPage);
  }

  goToPayment() {
    this.navCtrl.push(PaytmGatewayPage);  
  }

  logout() {
    this.afAuth.auth.signOut()
      .catch(err => {
        console.log(err);
      })
  }
}
