import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {SecuredComponent} from './components/secured.component';
import {HomeComponent} from './components/home/home.component';

@NgModule({
  declarations: [
    SecuredComponent,
    HomeComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SharedModule,
    SecuredComponent,
    HomeComponent
  ]
})
export class SecureModule { }
