import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { formData } from "../../environment/environment";
import { FileChooser } from "@ionic-native/file-chooser";
import { Base64 } from '@ionic-native/base64';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private fileChooser: FileChooser,
    private base64: Base64,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
  }

  openCamera(type: string) {
    console.log("openCamera");

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log("SUCCESS");

      formData.documents[type] = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  openGallery(type: string) {
    console.log("openGallery");

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: this.camera.MediaType.ALLMEDIA,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log("SUCCESS");

      formData.documents[type] = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  openFile(type: string) {
    console.log("openFile");

    this.fileChooser.open()
      .then(uri => {
        this.base64.encodeFile(uri).then((base64File: string) => {
          formData.documents[type] = base64File;
        }, (err) => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  signature = '';
  isDrawing = false;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };

  ionViewDidEnter() {
    this.signaturePad.clear()
  }

  drawComplete() {
    this.isDrawing = false;
  }

  drawStart() {
    this.isDrawing = true;
  }

  savePad() {
    this.signature = this.signaturePad.toDataURL();
    this.signaturePad.clear();
    let toast = this.toastCtrl.create({
      message: 'New Signature saved.',
      duration: 3000
    });
    toast.present();
  }

  clearPad() {
    formData.documents.signature = this.signaturePad.toDataURL();
    console.log(formData.documents.signature);
    this.signaturePad.clear();
  }
}
