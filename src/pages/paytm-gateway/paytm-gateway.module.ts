import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaytmGatewayPage } from './paytm-gateway';

@NgModule({
  declarations: [
    PaytmGatewayPage,
  ],
  imports: [
    IonicPageModule.forChild(PaytmGatewayPage),
  ],
})
export class PaytmGatewayPageModule {}
