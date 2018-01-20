import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { formData } from "../../environment/environment";
import { FileChooser } from "@ionic-native/file-chooser";
import { Base64 } from '@ionic-native/base64';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FilePath } from "@ionic-native/file-path";
import { AngularFireStorage } from "angularfire2/storage";

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
    private filePath: FilePath,
    private toastCtrl: ToastController,
    private afStorage: AngularFireStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
  }

  openCamera(type: string) {
    console.log("openCamera");

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.uploadImage(imageData, 'base64', 'image/jpeg');
      formData.documents[type] = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  openGallery(type: string) {
    console.log("openGallery");

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      this.uploadImage(imageData, 'base64', 'image/jpeg');
      formData.documents[type] = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  openFile(type: string) {
    console.log("openFile");

    let content = '';
    switch(type) {
      case 'salary_slip':
        content = 'application/pdf';
        break;
      case 'education':
        content = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
    }
    this.fileChooser.open()
      .then(uri => {
        this.filePath.resolveNativePath(uri)
          .then((res) => {
            this.base64.encodeFile(res).then((base64File: string) => {
              this.uploadImage(base64File, 'data_url', content);
              formData.documents[type] = res;
            }, (err) => {
              console.log(err);
            });
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  uploadImage(image, type, meta) {
    console.log(image.substring(0, 29));
    console.log("Upload Image");
    this.afStorage.ref("test.jpg").putString(image, type, { contentType: meta }) //application/pdf
      .catch(err => {
        console.log("Upload Failed: ", err);
      })
      .then(res => {
        console.log("Upload Successful");
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
    formData.documents.signature = this.signaturePad.toDataURL();
    console.log(formData.documents.signature);

    this.signaturePad.clear();
    let toast = this.toastCtrl.create({
      message: 'New Signature saved.',
      duration: 3000
    });
    toast.present();
  }

  clearPad() {
    this.signaturePad.clear();
  }

}
