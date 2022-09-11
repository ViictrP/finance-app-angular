import {AppComponent} from './app.component';
import {LoginComponent} from './public/components/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {GuestGuard} from './guards/guest.guard';

export const APP_ROUTES: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [GuestGuard]
    }
  ]
}];

export const routing = RouterModule.forRoot(APP_ROUTES);
