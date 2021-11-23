import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantPage } from './merchant.page';

const routes: Routes = [
  {
    path: '',
    component: MerchantPage,
    children: [
      {
        path: '',
        loadChildren: ()=> import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'payment-qr',
        loadChildren: ()=> import('./payment/payment.module').then(m => m.PaymentPageModule)
      },
      {
        path: 'payment-complete',
        loadChildren: () => import('./payment-complete/payment-complete.module').then( m => m.PaymentCompletePageModule)
      },
      {
        path: 'withdraw',
        loadChildren: () => import('./withdraw/withdraw.module').then( m => m.WithdrawPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantPageRoutingModule {}
