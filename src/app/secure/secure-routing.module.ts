import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureComponent } from './components/secure.component';
import { HomeComponent } from './components/home/home.component';
import { CreditCardsComponent } from './components/credit-cards/credit-cards.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { CreditCardFormComponent } from './components/credit-card-form/credit-card-form.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BalanceComponent } from './components/balance/balance.component';
import { RecurringExpensesFormComponent } from './components/recurring-expenses-form/recurring-expenses-form.component';

const routes: Routes = [{
  path: '',
  component: SecureComponent,
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
    },
    {
      path: 'credit-card-form',
      component: CreditCardFormComponent
    },
    {
      path: 'credit-card-form/:id',
      component: CreditCardFormComponent
    },
    {
      path: 'transaction-form',
      component: TransactionFormComponent
    },
    {
      path: 'transaction-form/:id',
      component: TransactionFormComponent
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'balance',
      component: BalanceComponent
    },
    {
      path: 'recurring-expenses-form',
      component: RecurringExpensesFormComponent
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule {

}
