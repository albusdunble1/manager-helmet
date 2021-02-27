import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StrikesPage } from './strikes.page';

const routes: Routes = [
  {
    path: '',
    component: StrikesPage,
  },
  {
    path: ':workerId',
    loadChildren: () => import('./strike-details/strike-details.module').then( m => m.StrikeDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrikesPageRoutingModule {}
