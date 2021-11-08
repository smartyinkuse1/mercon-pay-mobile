import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'consumer',
    loadChildren: () => import('./consumer/consumer.module').then(m => m.ConsumerPageModule)
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./merchant/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./merchant/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup/:value',
    loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'auth-choice',
    loadChildren: () => import('./auth/auth-choice/auth-choice.module').then( m => m.AuthChoicePageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./auth/landing/landing.module').then( m => m.LandingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
