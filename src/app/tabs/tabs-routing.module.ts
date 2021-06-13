import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../managerHome/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'detections',
        loadChildren: () => import('../detectionList/detections.module').then(m => m.DetectionsPageModule)
      },
      {
        path: 'strikes',
        loadChildren: () => import('../workerList/strikes.module').then(m => m.StrikesPageModule)
      },
      {
        path: 'appeals',
        loadChildren: () => import('../appealList/appeals.module').then(m => m.AppealsPageModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('../monthlyReports/reports.module').then(m => m.ReportsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
