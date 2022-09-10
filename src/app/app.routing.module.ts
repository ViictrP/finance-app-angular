import {AppComponent} from './app.component';
import {LoginComponent} from './public/components/login/login.component';
import {RouterModule, Routes} from '@angular/router';

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
      component: LoginComponent
    }
  ]
}];

export const routing = RouterModule.forRoot(APP_ROUTES);
