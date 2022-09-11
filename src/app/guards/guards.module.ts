import {NgModule} from '@angular/core';
import {PublicModule} from '../public/public.module';
import {GuestGuard} from './guest.guard';

@NgModule({
  declarations: [],
  imports: [
    PublicModule
  ],
  providers: [
    GuestGuard
  ],
  exports: []
})
export class GuardsModule {
}
