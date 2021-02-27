import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StrikesPage } from './strikes.page';

import { StrikesPageRoutingModule } from './strikes-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: StrikesPage }]),
    StrikesPageRoutingModule,
  ],
  declarations: [StrikesPage],
  providers: [DatePipe]
})
export class StrikesPageModule {}
