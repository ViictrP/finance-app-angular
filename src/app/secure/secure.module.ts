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

@NgModule({
  declarations: [
    SecureComponent,
    HomeComponent,
    HeaderComponent,
    BottomNavComponent,
    CreditCardsComponent,
    InvoicesComponent
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
    InvoiceService
  ]
})
export class SecureModule {
}
