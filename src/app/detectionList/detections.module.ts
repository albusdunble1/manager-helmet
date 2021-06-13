import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetectionsPage } from './detections.page';

import { DetectionsPageRoutingModule } from './detections-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DetectionsPageRoutingModule
  ],
  declarations: [DetectionsPage],
  providers: [DatePipe]
})
export class DetectionsPageModule {}
