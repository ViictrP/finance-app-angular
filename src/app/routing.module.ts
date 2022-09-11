import {AppComponent} from './components/app.component';
import {LoginComponent} from './public/components/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {GuestGuard} from './guards/guest.guard';
import {SecuredComponent} from './secure/components/secured.component';
import {LoggedInGuard} from './guards/logged-in.guard';
import {HomeComponent} from './secure/components/home/home.component';
import {NgModule} from '@angular/core';

export const APP_ROUTES: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    {
      path: '',
      redirectTo: '/secure/home',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [GuestGuard]
    },
    {
      path: 'secure',
      component: SecuredComponent,
      canActivate: [LoggedInGuard],
      children: [
        {
          path: 'home',
          component: HomeComponent
        }
      ]
    }
  ]
}];

export const routing = RouterModule.forRoot(APP_ROUTES);

@NgModule({
  imports: [routing],
  exports: [RouterModule]
})
export class RoutingModule {

}
