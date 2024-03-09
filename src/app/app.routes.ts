import {Routes} from '@angular/router';
import {LoginComponent} from "./components/public/login/login.component";
import {HomeComponent} from "./components/secure/home/home.component";
import {NotFoundComponent} from "./components/public/not-found/not-found.component";
import {SecureComponent} from "./components/secure/secure.component";
import {secureGuard} from "./guards/secure.guard";
import {publicGuard} from "./guards/public.guard";
import { CreateProfileComponent } from './components/secure/create-profile/create-profile.component';
import { CreditCardFormComponent } from './components/secure/credit-card-form/credit-card-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/secure', pathMatch: 'full'},
  {
    path: 'secure',
    redirectTo: 'secure/home',
    pathMatch: 'full',
  },
  {
    path: 'secure',
    component: SecureComponent,
    canActivate: [secureGuard],
    children: [
      {
        path: `home`,
        title: 'Início',
        component: HomeComponent
      },
      {
        path: 'create-profile',
        title: 'Criar Perfíl',
        component: CreateProfileComponent
      },
      {
        path: 'create-credit-card',
        title: 'Adicionar Cartão',
        component: CreditCardFormComponent
      }
    ]
  },
  {
    path: 'login',
    title: 'Finance App',
    canActivate: [publicGuard],
    component: LoginComponent
  },
  {path: '**', component: NotFoundComponent},
];
