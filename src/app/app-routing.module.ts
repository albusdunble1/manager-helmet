import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

// const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const redirectLoggedInToItems = () => redirectLoggedInTo(['items']);
// const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }

  },
  {
    path: 'login',
    loadChildren: () => import('./managerLogin/login.module').then( m => m.LoginPageModule)
  }
  // ,
  // {
  //   path: 'appeals',
  //   loadChildren: () => import('./appeals/appeals.module').then( m => m.AppealsPageModule)
  // },
  // {
  //   path: 'reports',
  //   loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
