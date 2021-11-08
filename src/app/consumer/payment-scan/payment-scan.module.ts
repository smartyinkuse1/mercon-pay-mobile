import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentScanPageRoutingModule } from './payment-scan-routing.module';

import { PaymentScanPage } from './payment-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentScanPageRoutingModule
  ],
  declarations: [PaymentScanPage]
})
export class PaymentScanPageModule {}
