import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { MenuPage } from '../menu/menu';

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
      duration: 3000,
      showCloseButton: true,
    });

    if(this.email == '' || this.password == '') {
      console.log('empty');
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
        if(err.code == 'auth/network-request-failed')
          toast.setMessage('Network Error. Make sure you are connected to internet and try again')
        toast.present();
      })
      
  }
}
