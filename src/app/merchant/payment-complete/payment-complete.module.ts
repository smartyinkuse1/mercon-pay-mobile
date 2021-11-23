import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentCompletePageRoutingModule } from './payment-complete-routing.module';

import { PaymentCompletePage } from './payment-complete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentCompletePageRoutingModule
  ],
  declarations: [PaymentCompletePage]
})
export class PaymentCompletePageModule {}
