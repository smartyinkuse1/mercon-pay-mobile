import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentScanPage } from './payment-scan.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentScanPageRoutingModule {}
