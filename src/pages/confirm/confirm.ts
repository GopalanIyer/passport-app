import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { formData } from '../../environment/environment';
import { App } from 'ionic-angular/components/app/app';
import { MenuPage } from '../menu/menu';
import { AngularFireDatabase } from "angularfire2/database";
import { LoadingPage } from '../loading/loading';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {

  data = formData;
  groups = [];
  shownGroup = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    private modalCtrl: ModalController,
    private afDB: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
    // console.log(JSON.stringify(this.data));

  }

  confirm() {
    // this.afDB.list('/applications').push(formData)
    // .then(() => {
    //   console.log("SUCCESS");
    // })

    // this.navCtrl.setRoot(MenuPage)

    let modal = this.modalCtrl.create(LoadingPage);
    modal.present();
    modal.onDidDismiss(data => {
      if(data) {
        this.navCtrl.setRoot(HomePage);
      }
    });
  }
}
