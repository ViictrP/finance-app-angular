import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {LoginService} from './services/login.service';
import {CookieService} from 'ngx-cookie-service';
import {FormModule} from '../form.module';
import {ApiModule} from '../api.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormModule,
    ApiModule
  ],
  providers: [
    LoginService,
    CookieService
  ]
})
export class PublicModule {
}
