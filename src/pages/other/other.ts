import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tabs } from 'ionic-angular/components/tabs/tabs';
import { formData } from '../../environment/environment';
import { PersonalPage } from '../personal/personal';
import { Dialogs } from "@ionic-native/dialogs";
import { PaymentPage } from '../payment/payment';
import { FamilyPage } from '../family/family';
import { WitnessesPage } from '../witnesses/witnesses';
import { ConfirmPage } from '../confirm/confirm';
import { App } from 'ionic-angular/components/app/app';

@Component({
  selector: 'page-other',
  templateUrl: 'other.html'
})
export class OtherPage {

  data = {
    action: '',
    type: '',
    old_passport: '',
    police_station: '',
    appointment_place: '',
    form_no: '',
    telecaller_name: '',
    executive_name: '',
  }

  constructor(public navCtrl: NavController, private dialogs: Dialogs, public app: App) {
  }

  previous() {
    var t: Tabs = this.navCtrl.parent;
    t.select(3);
  }

  submit() {
    formData.other = this.data;
    console.log(JSON.stringify(formData.other));

    var presonalMsg = new PersonalPage(this.navCtrl, this.dialogs).validate();
    var familyMsg = new FamilyPage(this.navCtrl, this.dialogs).validate();
    var witnessesMsg = new WitnessesPage(this.navCtrl, this.dialogs).validate();
    var paymentMsg = new PaymentPage(this.navCtrl, this.dialogs).validate();
    var otherMsg = this.validate();
    
    var err = false;
    var msg = '';
    if(presonalMsg != true) {
      err = true;
      msg += '\nPERSONAL:' + presonalMsg;
    }
    if(familyMsg != true) {
      err = true;
      msg += '\nFAMILY:' + familyMsg;
    }
    if(witnessesMsg != true) {
      err = true;
      msg += '\nWITNESSES:' + witnessesMsg;
    }
    if(paymentMsg != true) {
      err = true;
      msg += '\nPAYMENT:' + paymentMsg;
    }
    if(otherMsg != true) {
      err = true;
      msg += '\nOTHER:' + otherMsg;
    }

    if(err) {
      this.dialogs.alert(msg, "Following fields cannot be empty: ")
      .then(() => console.log("Dialog Dismissed"))
      .catch(() => console.log("Error"))
      return;
    }

    this.app.getRootNav().push(ConfirmPage);
    
  }


  onChange() {
    formData.other = this.data;
  }

  validate() {
    console.log("other: validate");
    var err = false;
    var msg = '';
    if (formData.other.action == '') {
      msg += '\n\t Action'
      err = true;
    }
    if (formData.other.type == '') {
      msg += '\n\t Type'
      err = true;
    }
    if (formData.other.old_passport == '') {
      msg += '\n\t Old Passport'
      err = true;
    }
    if (formData.other.police_station == '') {
      msg += '\n\t Police Station'
      err = true;
    }
    if (formData.other.appointment_place == '') {
      msg += '\n\t Appointment Place'
      err = true;
    }
    if (formData.other.form_no == '') {
      msg += '\n\t Form Number'
      err = true;
    }
    if (formData.other.telecaller_name == '') {
      msg += '\n\t Telecaller Name'
      err = true;
    }
    if (formData.other.executive_name == '') {
      msg += '\n\t Executive Name'
      err = true;
    }

    if (!err) {
      return true;
    }

    return msg;
  }
}
