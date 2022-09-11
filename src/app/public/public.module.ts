import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {LoginService} from './services/login.service';
import {CookieService} from 'ngx-cookie-service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    LoginService,
    CookieService
  ],
  exports: [
    SharedModule,
    LoginComponent
  ]
})
export class PublicModule { }
