import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string;
  password: string;
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth) {
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .catch(err => {
        console.log(JSON.stringify(err));
      })
  }
}
