import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentSearchPageRoutingModule } from './payment-search-routing.module';

import { PaymentSearchPage } from './payment-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentSearchPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PaymentSearchPage]
})
export class PaymentSearchPageModule {}
