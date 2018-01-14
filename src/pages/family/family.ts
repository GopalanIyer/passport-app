import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tabs } from 'ionic-angular/components/tabs/tabs';
import { formData } from '../../environment/environment';
import { Dialogs } from "@ionic-native/dialogs";

@Component({
  selector: 'page-family',
  templateUrl: 'family.html'
})
export class FamilyPage {

  data = {
    father_name: '',
    mother_name: '',
    hus_wif_name: '',
    marriage_date: '',
    government: '',
  }

  constructor(public navCtrl: NavController, private dialogs: Dialogs) {
  }

  next() {
    formData.family = this.data;
    console.log(JSON.stringify(formData.family));

    var res = this.validate();
    if(res != true) {
      this.dialogs.alert(res, "Following fields cannot be empty: ");
      return;
    }

    var t: Tabs = this.navCtrl.parent;
    t.select(2);
  }

  previous() {
    console.log('prev');
    var t: Tabs = this.navCtrl.parent;
    t.select(0);
  }

  onChange() {
    formData.family = this.data;
  }

  validate() {
    console.log("family: validate");
    var err = false;
    var msg = '';
    if (formData.family.father_name == '') {
      msg += "\n\t Father's Name"
      err = true;
    }
    if (formData.family.mother_name == '') {
      msg += "\n\t Mother's Name"
      err = true;
    }
    if (formData.family.hus_wif_name == '') {
      msg += "\n\t Husband's/Wife's Name"
      err = true;
    }
    if (formData.family.marriage_date == '') {
      msg += "\n\t Marriage Date"
      err = true;
    }
    if (formData.family.government == '') {
      msg += "\n\t Government Servant"
      err = true;
    }

    if (!err) {
      return true;
    }

    return msg;
  }
}
