import { AppComponent } from './components/app.component';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './guards/guest.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
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
      loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
      canActivate: [GuestGuard],
    },
    {
      path: 'secure',
      loadChildren: () => import('./secure/secure.module').then(m => m.SecureModule),
      canActivate: [LoggedInGuard],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class RoutingModule {

}
