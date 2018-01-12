import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tabs } from 'ionic-angular/components/tabs/tabs';
import { formData } from '../../environment/environment';
import { Dialogs } from "@ionic-native/dialogs";

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {

  data = {
    amount: '',
    amount_affidavit: '',
    amount_total: '',
    cheque_no: '',
    bank_name: '',
  }

  constructor(public navCtrl: NavController, private dialogs: Dialogs) {
  }

  next() {
    formData.payment = this.data;
    console.log(JSON.stringify(formData.payment));

    var res = this.validate();
    if(res != true) {
      this.dialogs.alert(res, "Following fields cannot be empty: ");
      return;
    }

    var t: Tabs = this.navCtrl.parent;
    t.select(4);
  }

  previous() {
    var t: Tabs = this.navCtrl.parent;
    t.select(2);
  }

  validate() {
    console.log("payment: validate");
    var err = false;
    var msg = '';
    if (formData.payment.amount == '') {
      msg += '\n\t Amount'
      err = true;
    }
    if (formData.payment.amount_affidavit == '') {
      msg += '\n\t Affidavit Amount'
      err = true;
    }
    if (formData.payment.amount_total == '') {
      msg += '\n\t Total Amount'
      err = true;
    }
    if (formData.payment.cheque_no == '') {
      msg += '\n\t DD/Cheque Number'
      err = true;
    }
    if (formData.payment.bank_name == '') {
      msg += '\n\t Bank Name'
      err = true;
    }

    if (!err) {
      return true;
    }

    return msg;
  }
}
