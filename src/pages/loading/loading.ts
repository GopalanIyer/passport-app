import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { documents } from '../../environment/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  percentage = 0;
  displayPercent = 0;
  array = [0, 0, 0, 0, 0, 0];
  uploaded = [false, false, false, false, false, false];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afStorage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadingPage');
    this.uploadImages();
  }

  uploadImages() {
    console.log("Upload Images");
    Observable.interval(100).subscribe(_ => {
      if (this.displayPercent < this.percentage)
        this.displayPercent += 1;
    })

    //AADHAR
    const task1: AngularFireUploadTask = this.afStorage.ref(this.afAuth.auth.currentUser.uid + "/aadhar.jpg").putString(documents.aadhar, 'base64', { contentType: 'image/jpeg' });
    task1.percentageChanges().subscribe(currentPercent => {
      if (currentPercent <= 100) {
        this.array[0] = Math.round(currentPercent);
        this.update();
      }
    }, err => {
      console.log("Error: ", err);
    }, () => {
      console.log("Aadhar Upload Successful");
      this.uploaded[0] = true;
    });

    //PAN
    const task2: AngularFireUploadTask = this.afStorage.ref(this.afAuth.auth.currentUser.uid + "/pan.jpg").putString(documents.pan, 'base64', { contentType: 'image/jpeg' });
    task2.percentageChanges().subscribe(currentPercent => {
      if (currentPercent <= 100) {
        this.array[1] = Math.round(currentPercent);
        this.update();

      }
    }, err => {
      console.log("Error: ", err);
    }, () => {
      console.log("Pan Upload Successful");
      this.uploaded[1] = true;
    });

    //BANK_DETAILS
    const task3: AngularFireUploadTask = this.afStorage.ref(this.afAuth.auth.currentUser.uid + "/bank_details.jpg").putString(documents.bank_details, 'base64', { contentType: 'image/jpeg' });
    task3.percentageChanges().subscribe(currentPercent => {
      if (currentPercent <= 100) {
        this.array[2] = Math.round(currentPercent);
        this.update();
      }
    }, err => {
      console.log("Error: ", err);
    }, () => {
      console.log("Bank Upload Successful");
      this.uploaded[2] = true;
    });

    //SALARY_SLIP
    const task4: AngularFireUploadTask = this.afStorage.ref(this.afAuth.auth.currentUser.uid + "/salary_slip.jpg").putString(documents.salary_slip, 'data_url', { contentType: 'application/pdf' });
    task4.percentageChanges().subscribe(currentPercent => {
      if (currentPercent <= 100) {
        this.array[3] = Math.round(currentPercent);
        this.update();
      }
    }, err => {
      console.log("Error: ", err);
    }, () => {
      console.log("Salary Upload Successful");
      this.uploaded[3] = true;
    });

    //EDUCATION
    const task5: AngularFireUploadTask = this.afStorage.ref(this.afAuth.auth.currentUser.uid + "/education.jpg").putString(documents.education, 'data_url', { contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    task5.percentageChanges().subscribe(currentPercent => {
      if (currentPercent <= 100) {
        this.array[4] = Math.round(currentPercent);
        this.update();

      }
    }, err => {
      console.log("Error: ", err);
    }, () => {
      console.log("Education Upload Successful");
      this.uploaded[4] = true;
    });

    //SIGNATURE
    const task6: AngularFireUploadTask = this.afStorage.ref(this.afAuth.auth.currentUser.uid + "/signature.jpg").putString(documents.signature, 'base64', { contentType: 'image/jpeg' });
    task6.percentageChanges().subscribe(currentPercent => {
      if (currentPercent <= 100) {
        this.array[5] = Math.round(currentPercent);
        this.update();
      }
    }, err => {
      console.log("Error: ", err);
    }, () => {
      console.log("Signature Upload Successful");
      this.uploaded[5] = true;
    });
    task6.snapshotChanges().subscribe()
  }

  update() {
    this.percentage = (this.array[0] + this.array[1] + this.array[2] + this.array[3] + this.array[4] + this.array[5]) / 6;
    console.log("Percent: ", this.percentage);
  }

  checkdone() {
    let all = true;
    this.uploaded.forEach(element => {
      all = all && element;
    })

    if (all) {
      this.toastCtrl.create({
        message: "Application Submitted Successfully",
        duration: 3000,
      }).present();
      this.viewCtrl.dismiss(true);
    }
  }

  //TODO: disable bakc pressed
}
