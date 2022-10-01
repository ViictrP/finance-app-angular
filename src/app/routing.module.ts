import {AppComponent} from './components/app.component';
import {LoginComponent} from './public/components/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {GuestGuard} from './guards/guest.guard';
import {SecureComponent} from './secure/components/secure.component';
import {LoggedInGuard} from './guards/logged-in.guard';
import {HomeComponent} from './secure/components/home/home.component';
import {NgModule} from '@angular/core';
import {CreditCardsComponent} from './secure/components/credit-cards/credit-cards.component';
import {InvoicesComponent} from './secure/components/invoices/invoices.component';

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
      component: SecureComponent,
      canActivate: [LoggedInGuard],
      children: [
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'credit-cards',
          component: CreditCardsComponent
        },
        {
          path: 'credit-cards/:id',
          component: InvoicesComponent
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
