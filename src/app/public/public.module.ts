import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {LoginService} from './services/login.service';
import {CookieService} from 'ngx-cookie-service';
import {FormModule} from '../form.module';
import {ApiModule} from '../api.module';
import {CommonModule} from '@angular/common';
import {LibModule} from '../lib/lib.module';
import { RouterLink } from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {RegisterService} from './services/register.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormModule,
    ApiModule,
    LibModule,
    RouterLink,
    RouterLink
  ],
  providers: [
    LoginService,
    CookieService,
    RegisterService
  ]
})
export class PublicModule {
}
