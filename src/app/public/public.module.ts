import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { ApiModule } from '../api.module';
import { LibModule } from '../lib/lib.module';
import { RegisterComponent } from './components/register/register.component';
import { RegisterService } from './services/register.service';
import { PublicComponent } from './components/public.component';
import { PublicRoutingModule } from './public.routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PublicComponent
  ],
  imports: [
    PublicRoutingModule,
    ApiModule,
    LibModule
  ],
  providers: [
    LoginService,
    CookieService,
    RegisterService
  ]
})
export class PublicModule {
}
