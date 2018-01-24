import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { formData } from '../../environment/environment';
import { App } from 'ionic-angular/components/app/app';
import { MenuPage } from '../menu/menu';
import { AngularFireDatabase } from "angularfire2/database";
import { LoadingPage } from '../loading/loading';
import { HomePage } from '../home/home';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { AngularFireAuth } from 'angularfire2/auth';

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
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');

  }

  @ViewChild('customSwal') private customSwal: SwalComponent;
  confirm() {
    let id = this.afDB.createPushId();
    this.afDB.object('/applications/' + this.afAuth.auth.currentUser.uid + "/" + id).set(formData)
      .then(() => {
        console.log("SUCCESS");
      })
    let modal = this.modalCtrl.create(LoadingPage, { id: id }, { enableBackdropDismiss: false });
    modal.present();
    modal.onDidDismiss(data => {
      if (data == true) {
        this.customSwal.show();
      }
      else {
        this.customSwal.type = 'error';
        this.customSwal.title = 'Error uploading following documents';
        this.customSwal.text = data;
        this.customSwal.show();
      }
    });
  }

  dismiss() {
    this.navCtrl.setRoot(MenuPage);
  }
}
