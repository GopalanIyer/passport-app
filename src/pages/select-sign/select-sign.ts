import { Component, ViewChild, Renderer, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Platform } from 'ionic-angular/platform/platform';
import { documents } from '../../environment/environment';

@IonicPage()
@Component({
  selector: 'page-select-sign',
  templateUrl: 'select-sign.html',
})
export class SelectSignPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private platform: Platform,
  ) {
    console.log('Platfrom Width: ' + this.platform.width());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectSignPage');
  }

  isDrawing = false;

  @ViewChild('SignaturePad1') signaturePad1: SignaturePad;
  @ViewChild('SignaturePad2') signaturePad2: SignaturePad;
  private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 2,
    'canvasWidth': this.platform.width() >= 768 ? (this.platform.width() / 2) - 70 : this.platform.width(),
    'canvasHeight': this.platform.width() >= 768 ? this.platform.height() : 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };

  ionViewDidEnter() {
    this.clearPad1();
    this.clearPad2();
  }

  drawComplete() {
    this.isDrawing = false;
  }

  drawStart() {
    this.isDrawing = true;
  }

  savePad() {
    let signature1 = this.signaturePad1.toDataURL();
    let signature2 = this.signaturePad2.toDataURL()
    let toast = this.toastCtrl.create({
      message: 'New Signatures saved.',
      duration: 2000,
      showCloseButton: true,
    });
    toast.present();

    documents[5].data = signature1;
    documents[6].data = signature2;
    this.viewCtrl.dismiss(true);
  }

  clearPad1() {
    this.signaturePad1.clear();
  }

  clearPad2() {
    this.signaturePad2.clear();
  }

  cancel() {
    this.viewCtrl.dismiss(false);
  }
}
