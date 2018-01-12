import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonalPage } from '../personal/personal';
import { FamilyPage } from '../family/family';
import { WitnessesPage } from '../witnesses/witnesses';
import { PaymentPage } from '../payment/payment';
import { OtherPage } from '../other/other';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

  tab1Root: any = PersonalPage;
  tab2Root: any = FamilyPage;
  tab3Root: any = WitnessesPage;
  tab4Root: any = PaymentPage;
  tab5Root: any = OtherPage;
  constructor(public navCtrl: NavController) {
  }
  
  tabClick() {
    console.log("CLICK");
  }
}
