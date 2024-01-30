import {Routes} from '@angular/router';
import {LoginComponent} from "./components/public/login/login.component";
import {HomeComponent} from "./components/secure/home/home.component";
import {NotFoundComponent} from "./components/public/not-found/not-found.component";
import {SecureComponent} from "./components/secure/secure.component";
import {secureGuard} from "./guards/secure.guard";
import {publicGuard} from "./guards/public.guard";

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
