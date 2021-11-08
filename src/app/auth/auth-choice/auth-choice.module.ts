import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthChoicePageRoutingModule } from './auth-choice-routing.module';

import { AuthChoicePage } from './auth-choice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthChoicePageRoutingModule
  ],
  declarations: [AuthChoicePage]
})
export class AuthChoicePageModule {}
