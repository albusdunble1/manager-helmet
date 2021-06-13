import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppealsPageRoutingModule } from './appeals-routing.module';

import { AppealsPage } from './appeals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppealsPageRoutingModule
  ],
  declarations: [AppealsPage]
})
export class AppealsPageModule {}
