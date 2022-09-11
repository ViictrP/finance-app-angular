import {NgModule} from '@angular/core';
import {SecuredComponent} from './components/secured.component';
import {HomeComponent} from './components/home/home.component';
import {FormModule} from '../form.module';
import {ApiModule} from '../api.module';
import {RoutingModule} from '../routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    SecuredComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    FormModule,
    ApiModule
  ]
})
export class SecureModule {
}
