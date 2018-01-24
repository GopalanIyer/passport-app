import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string = '';
  password: string = '';
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toatCtrl: ToastController) {
  }

  login() {

    let toast = this.toatCtrl.create({
      message: "Invalid Username or Password",
      duration: 3000
    });

    if(this.email == '' || this.password == '') {
      toast.present();
      return;
    }

    let loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
      content: "Logging In...",
      enableBackdropDismiss: false
    })

    loading.present();
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(_ => {
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        console.log(JSON.stringify(err));
        toast.present();
      })
  }
}
