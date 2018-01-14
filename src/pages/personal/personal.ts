import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tabs } from 'ionic-angular/components/tabs/tabs';
import { formData } from "../../environment/environment";
import { Dialogs } from "@ionic-native/dialogs";

@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html'
})
export class PersonalPage {

  data = {
    name: '',
    surname: '',
    name_changed: false,
    changed_name: '',
    birth_date: '',
    birth_place: '',
    qualification: '',
    profession: '',
    address: '',
    residing_since: '',
    contact_no1: '',
    contact_no2: ''
  }

  constructor(public navCtrl: NavController, private dialogs: Dialogs) {
  }

  next() {
    formData.personal = this.data;
    console.log(JSON.stringify(formData.personal));
    var res = this.validate();
    if(res != true) {
      this.dialogs.alert(res, "Following fields cannot be empty: ");
      return;
    }

    var t: Tabs = this.navCtrl.parent;
    t.select(1);
  }

  onChange() {
    formData.personal = this.data;
  }

  validate() {
    console.log("personal: validate");
    var err = false;
    var msg = '';
    if (formData.personal.name == '') {
      msg += '\n\t Name'
      err = true;
    }
    if (formData.personal.surname == '') {
      msg += '\n\t Surname'
      err = true;
    }
    if (formData.personal.birth_date == '') {
      msg += '\n\t Date of Birth'
      err = true;
    }
    if (formData.personal.birth_place == '') {
      msg += '\n\t Place of Birth'
      err = true;
    }
    if (formData.personal.qualification == '') {
      msg += '\n\t Qualification'
      err = true;
    }
    if (formData.personal.profession == '') {
      msg += '\n\t Profession'
      err = true;
    }
    if (formData.personal.address == '') {
      msg += '\n\t Address'
      err = true;
    }
    if (formData.personal.residing_since == '') {
      msg += '\n\t Residing Since'
      err = true;
    }
    if (formData.personal.contact_no1 == '') {
      msg += '\n\t Primary Contact Number'
      err = true;
    }
    if (formData.personal.contact_no2 == '') {
      msg += '\n\t Secondary Contact Number'
      err = true;
    }
    if (formData.personal.name_changed == true) {
      if (formData.personal.changed_name == '') {
        msg += '\n\t Changed Name'
        err = true;
      }
    }

    if (!err) {
      return true;
    }

    return msg;
  }
}
