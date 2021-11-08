import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthChoicePage } from './auth-choice.page';

const routes: Routes = [
  {
    path: '',
    component: AuthChoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthChoicePageRoutingModule {}
