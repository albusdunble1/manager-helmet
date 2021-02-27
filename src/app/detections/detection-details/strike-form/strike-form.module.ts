import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StrikeFormPageRoutingModule } from './strike-form-routing.module';

import { StrikeFormPage } from './strike-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StrikeFormPageRoutingModule
  ],
  declarations: [StrikeFormPage]
})
export class StrikeFormPageModule {}
