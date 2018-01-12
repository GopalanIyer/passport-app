import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tabs } from 'ionic-angular/components/tabs/tabs';
import { formData } from '../../environment/environment';
import { Dialogs } from "@ionic-native/dialogs";

@Component({
  selector: 'page-witnesses',
  templateUrl: 'witnesses.html'
})
export class WitnessesPage {

  data = {
    name_witness1: '',
    address_witness1: '',
    name_witness2: '',
    address_witness2: '',
}

  constructor(public navCtrl: NavController, private dialogs: Dialogs) {
  }
  
  next() {
    formData.witnesses = this.data
    console.log(JSON.stringify(formData.witnesses));

    var res = this.validate();
    if(res != true) {
      this.dialogs.alert(res, "Following fields cannot be empty: ");
      return;
    }

    var t: Tabs = this.navCtrl.parent;
    t.select(3);
  }

  previous() {
    var t: Tabs = this.navCtrl.parent;
    t.select(1);
  }

  validate() {
    console.log("witness: validate");
    var err = false;
    var msg = '';
    if (formData.witnesses.name_witness1 == '') {
      msg += '\n\t Witness 1 Name'
      err = true;
    }
    if (formData.witnesses.name_witness2 == '') {
      msg += '\n\t Witness 2 Name'
      err = true;
    }
    if (formData.witnesses.address_witness1 == '') {
      msg += '\n\t Witness 1 Address'
      err = true;
    }
    if (formData.witnesses.address_witness2 == '') {
      msg += '\n\t Witness 2 Address'
      err = true;
    }

    if (!err) {
      return true;
    }

    return msg;
  }
}
