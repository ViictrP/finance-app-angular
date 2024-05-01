import {Routes} from '@angular/router';
import {LoginComponent} from "./components/public/login/login.component";
import {HomeComponent} from "./components/secure/home/home.component";
import {NotFoundComponent} from "./components/public/not-found/not-found.component";
import {SecureComponent} from "./components/secure/secure.component";
import {secureGuard} from "./guards/secure.guard";
import {publicGuard} from "./guards/public.guard";
import { CreateProfileComponent } from './components/secure/create-profile/create-profile.component';
import { CreditCardFormComponent } from './components/secure/credit-cards/credit-card-form/credit-card-form.component';
import { CreditCardsComponent } from './components/secure/credit-cards/credit-cards.component';
import {
  TransactionsFormComponent
} from './components/secure/transactions/transactions-form/transactions-form.component';
import { BalanceComponent } from './components/secure/balance/balance.component';
import { InvoiceComponent } from './components/secure/credit-cards/invoice/invoice.component';

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
        path: 'credit-cards',
        title: 'Seus cartões',
        component: CreditCardsComponent
      },
      {
        path: 'create-credit-cards',
        title: 'Adicionar Cartão',
        component: CreditCardFormComponent
      },
      {
        path: 'edit-credit-cards/:id',
        title: 'Editar Cartão',
        component: CreditCardFormComponent
      },
      {
        path: 'credit-cards/:id/invoices',
        title: 'Fatura do cartão',
        component: InvoiceComponent
      },
      {
        path: 'create-transactions',
        title: 'Adicionar Transação',
        component: TransactionsFormComponent
      },
      {
        path: 'balance',
        title: 'Extrato do mês',
        component: BalanceComponent
      },
      {
        path: 'profile',
        title: 'Configuração',
        component: CreateProfileComponent
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
