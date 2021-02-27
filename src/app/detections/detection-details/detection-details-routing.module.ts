import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetectionDetailsPage } from './detection-details.page';

const routes: Routes = [
  {
    path: '',
    component: DetectionDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetectionDetailsPageRoutingModule {}
