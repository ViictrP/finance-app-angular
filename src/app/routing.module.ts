import { AppComponent } from './components/app.component';
import { RouterModule, Routes } from '@angular/router';
import { guestGuard, loggedInGuard } from './guards';
import { NgModule } from '@angular/core';

export const APP_ROUTES: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    {
      path: '',
      redirectTo: '/secure/home',
      pathMatch: 'full',
    },
    {
      path: 'secure',
      redirectTo: '/secure/home',
      pathMatch: 'full',
    },
    {
      path: 'public',
      redirectTo: '/public/login',
      pathMatch: 'full',
    },
    {
      path: 'public',
      loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
      canActivateChild: [guestGuard],
      canActivate: [guestGuard],
    },
    {
      path: 'secure',
      loadChildren: () => import('./secure/secure.module').then(m => m.SecureModule),
      canActivateChild: [loggedInGuard],
      canActivate: [loggedInGuard],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class RoutingModule {

}
