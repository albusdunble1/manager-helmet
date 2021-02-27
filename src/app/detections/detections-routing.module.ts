import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetectionsPage } from './detections.page';

const routes: Routes = [
  {
    path: '',
    component: DetectionsPage,
  },
  {
    path: 'newstrike/:detectionId',
    loadChildren: () => import('./detection-details/strike-form/strike-form.module').then( m => m.StrikeFormPageModule)
  },
  {
    path: ':detectionId',
    loadChildren: () => import('./detection-details/detection-details.module').then( m => m.DetectionDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetectionsPageRoutingModule {}
