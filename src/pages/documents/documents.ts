import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { formData, documents } from "../../environment/environment";
import { FileChooser } from "@ionic-native/file-chooser";
import { Base64 } from '@ionic-native/base64';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FilePath } from "@ionic-native/file-path";
import { AngularFireStorage, AngularFireUploadTask } from "angularfire2/storage";
import { Tabs } from 'ionic-angular/components/tabs/tabs';
import { SelectSignPage } from '../select-sign/select-sign';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { Dialogs } from '@ionic-native/dialogs';

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {

  aadhar_selected = false;
  pan_selected = false;
  bank_details_selected = false;
  salary_slip_selected = false;
  education_selected = false;
  signature_selected = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private fileChooser: FileChooser,
    private base64: Base64,
    private filePath: FilePath,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private afStorage: AngularFireStorage,
    private dialogs: Dialogs, ) {
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
      this.setData(type, imageData);
      switch (type) {
        case 'Aadhar Card':
          this.aadhar_selected = true;
          break;
        case 'Pan Card':
          this.pan_selected = true;
          break;
      }
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
      this.setData(type, imageData);
      this.bank_details_selected = true;
    }, (err) => {
      console.log(err);
    });
  }

  openFile(type: string) {
    console.log("openFile");

    let content = '';
    switch (type) {
      case 'Salary Slip':
        content = 'application/pdf';
        break;
      case 'Education Details':
        content = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
    }

    this.fileChooser.open()
      .then(uri => {
        this.filePath.resolveNativePath(uri)
          .then((res) => {
            this.base64.encodeFile(res).then((base64File: string) => {
              this.setData(type, base64File);
              switch (type) {
                case 'Salary Slip':
                  this.salary_slip_selected = true;
                  break;
                case 'Education Details':
                  this.education_selected = true;
                  break;
              }
            }, (err) => {
              console.log(err);
            });
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  openSignature() {
    let modal = this.modalCtrl.create(SelectSignPage, {}, { showBackdrop: true, enableBackdropDismiss: true });
    modal.present();

    modal.onDidDismiss(data => {
      console.log("Modal onDismiss");
      this.signature_selected = data;
    })
  }

  next() {
    var res = this.validate();
    if (res != true) {
      this.dialogs.alert(res, "Please select following fields: ");
      return;
    }

    var t: Tabs = this.navCtrl.parent;
    t.select(5);
  }

  previous() {
    var t: Tabs = this.navCtrl.parent;
    t.select(3);
  }

  validate() {
    console.log("documents: validate");
    var err = false;
    var msg = '';
    documents.forEach(element => {
      if (element.data == '') {
        msg += "\n\t " + element.name;
        err = true;
      }
    })
    if (err) {
      return msg;
    }

    return true;
  }

  setData(type, data) {
    documents.forEach(element => {
      if (element.name == type) {
        element.data = data;
        return;
      }
    })
  }
}
