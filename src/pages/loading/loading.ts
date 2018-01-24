import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { documents } from '../../environment/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Platform } from 'ionic-angular/platform/platform';

@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  id = '';
  percentage = 0;
  displayPercent = 0;
  array = [0, 0, 0, 0, 0, 0];
  errMsg = '';
  uploaded = [false, false, false, false, false, false];
  // uploaded = [true, true, true, true, true, true];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afStorage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController) {
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadingPage');
    this.uploadImages();
  }

  uploadImages() {
    console.log("Upload Images");
    Observable.interval(100).subscribe(_ => {
      if (this.displayPercent < this.percentage && this.displayPercent < 100)
        this.displayPercent += 1;
    })

    let path = this.afAuth.auth.currentUser.uid + "/" + this.id + "/";

    documents.forEach((element, i) => {
      try {
        let task = this.afStorage.ref(path + element.uploadName).putString(element.data, element.format, { contentType: element.contentType });

        task.percentageChanges().subscribe(currentPercent => {
          if (currentPercent <= 100) {
            this.array[i] = Math.round(currentPercent);
            this.update();
          }
        }, err => {
          this.handleError(err, element.name, i);
        }, () => {
          console.log(element.name, " Successful");
          this.uploaded[i] = true;
          this.checkdone();
        });
      }
      catch (ex) {
        this.handleError(ex, element.name, i);
      }

    })
  }

  handleError(error, name, index) {
    console.log(name + " Failed");

    try {
      console.log(JSON.stringify(error));
    }
    catch (ex) {
      console.log(error);
    }
    finally {
      if (this.errMsg != '')
        this.errMsg += ', ';
      this.errMsg += name;
      this.uploaded[index] = true;
      this.checkdone();
    }
  }

  update() {
    this.percentage = (this.array[0] + this.array[1] + this.array[2] + this.array[3] + this.array[4] + this.array[5]) / 6;
  }

  checkdone() {
    let all = true;
    this.uploaded.forEach(element => {
      all = all && element;
    })
    if (all) {
      if (this.errMsg == '')
        this.viewCtrl.dismiss(true);
      else
        this.viewCtrl.dismiss(this.errMsg);
    }
  }
}
