import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StrikeFormPage } from './strike-form.page';

const routes: Routes = [
  {
    path: '',
    component: StrikeFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StrikeFormPageRoutingModule {}
