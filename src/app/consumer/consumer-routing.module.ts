import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumerPage } from './consumer.page';

const routes: Routes = [
  {
    path: '',
    component: ConsumerPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'payment-method',
        loadChildren: () => import('./payment-method/payment-method.module').then( m => m.PaymentMethodPageModule)
      },
      {
        path: 'payment-search',
        loadChildren: () => import('./payment-search/payment-search.module').then( m => m.PaymentSearchPageModule)
      },
      {
        path: 'payment-scan',
        loadChildren: () => import('./payment-scan/payment-scan.module').then( m => m.PaymentScanPageModule)
      },
      {
        path: 'payment-confirm/:id',
        loadChildren: () => import('./payment-confirm/payment-confirm.module').then( m => m.PaymentConfirmPageModule)
      },
      {
        path: 'payment-complete',
        loadChildren: () => import('./payment-complete/payment-complete.module').then( m => m.PaymentCompletePageModule)
      },
      {
        path: 'deposit',
        loadChildren: () => import('./deposit/deposit.module').then( m => m.DepositPageModule)
      },
      {
        path: 'approve',
        loadChildren: () => import('./approve/approve.module').then( m => m.ApprovePageModule)
      },
      {
        path: 'verify-payment/:id/:amount',
        loadChildren: () => import('./verify-payment/verify-payment.module').then( m => m.VerifyPaymentPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumerPageRoutingModule {}
