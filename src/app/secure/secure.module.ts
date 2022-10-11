import {NgModule} from '@angular/core';
import {SecureComponent} from './components/secure.component';
import {HomeComponent} from './components/home/home.component';
import {FormModule} from '../form.module';
import {ApiModule} from '../api.module';
import {RoutingModule} from '../routing.module';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {BottomNavComponent} from './components/bottom-nav/bottom-nav.component';
import {UserService} from './services/user.service';
import {LibModule} from '../lib/lib.module';
import {CreditCardsComponent} from './components/credit-cards/credit-cards.component';
import {InvoicesComponent} from './components/invoices/invoices.component';
import {InvoiceService} from './services/invoice.service';
import {CreditCardFormComponent} from './components/credit-card-form/credit-card-form.component';
import {TransactionFormComponent} from './components/transaction-form/transaction-form.component';
import {CreditCardService} from './services/credit-card.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {UserHttpInterceptor} from './interceptors/user-http.interceptor';
import {AuthorizationInterceptor} from './interceptors/authorization.interceptor';
import TransactionService from './services/transaction.service';

@NgModule({
  declarations: [
    SecureComponent,
    HomeComponent,
    HeaderComponent,
    BottomNavComponent,
    CreditCardsComponent,
    InvoicesComponent,
    CreditCardFormComponent,
    TransactionFormComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    FormModule,
    ApiModule,
    LibModule
  ],
  providers: [
    UserService,
    InvoiceService,
    CreditCardService,
    TransactionService,
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
