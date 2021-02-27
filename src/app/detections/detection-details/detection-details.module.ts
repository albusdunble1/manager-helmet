import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetectionDetailsPageRoutingModule } from './detection-details-routing.module';

import { DetectionDetailsPage } from './detection-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetectionDetailsPageRoutingModule
  ],
  declarations: [DetectionDetailsPage]
})
export class DetectionDetailsPageModule {}
