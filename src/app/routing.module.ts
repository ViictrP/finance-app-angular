import { AppComponent } from './components/app.component';
import { RouterModule, Routes } from '@angular/router';
import { guestGuard, loggedInGuard } from './guards';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
      path: '',
      loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
      canActivateChild: [guestGuard],
      canActivate: [guestGuard],
    },
    {
      path: '',
      loadChildren: () => import('./secure/secure.module').then(m => m.SecureModule),
      canActivateChild: [loggedInGuard],
      canActivate: [loggedInGuard],
    },
    {
      path:'**',
      component: NotFoundComponent
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class RoutingModule {

}
