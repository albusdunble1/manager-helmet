import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppealsPage } from './appeals.page';

const routes: Routes = [
  {
    path: '',
    component: AppealsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppealsPageRoutingModule {}
