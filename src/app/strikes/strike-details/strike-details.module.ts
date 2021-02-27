import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StrikeDetailsPageRoutingModule } from './strike-details-routing.module';

import { StrikeDetailsPage } from './strike-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StrikeDetailsPageRoutingModule
  ],
  declarations: [StrikeDetailsPage]
})
export class StrikeDetailsPageModule {}
