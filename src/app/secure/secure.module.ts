import { NgModule } from '@angular/core';
import { SecureComponent } from './components/secure.component';
import { HomeComponent } from './components/home/home.component';
import { ApiModule } from '../api.module';
import { HeaderComponent } from './components/header/header.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { UserService } from './services/user.service';
import { LibModule } from '../lib/lib.module';
import { CreditCardsComponent } from './components/credit-cards/credit-cards.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { InvoiceService } from './services/invoice.service';
import { CreditCardFormComponent } from './components/credit-card-form/credit-card-form.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { CreditCardService } from './services/credit-card.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserHttpInterceptor } from './interceptors/user-http.interceptor';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import TransactionService from './services/transaction.service';
import { ProfileComponent } from './components/profile/profile.component';
import { BalanceComponent } from './components/balance/balance.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RecurringExpensesFormComponent } from './components/recurring-expenses-form/recurring-expenses-form.component';
import { RecurringExpensesService } from './services/recurring-expenses.service';
import { PreferencesService } from './services/preferences.service';
import { SecureRoutingModule } from './secure-routing.module';

const components = [
  SecureComponent,
  HomeComponent,
  HeaderComponent,
  BottomNavComponent,
  CreditCardsComponent,
  InvoicesComponent,
  CreditCardFormComponent,
  TransactionFormComponent,
  ProfileComponent,
  BalanceComponent,
  RecurringExpensesFormComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    SecureRoutingModule,
    NgApexchartsModule,
    ApiModule,
    LibModule
  ],
  providers: [
    UserService,
    InvoiceService,
    CreditCardService,
    TransactionService,
    RecurringExpensesService,
    PreferencesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserHttpInterceptor,
      multi: true
    }
  ]
})
export class SecureModule {
}
