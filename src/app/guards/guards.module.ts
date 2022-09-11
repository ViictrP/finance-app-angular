import {NgModule} from '@angular/core';
import {PublicModule} from '../public/public.module';
import {GuestGuard} from './guest.guard';
import {LoggedInGuard} from './logged-in.guard';

@NgModule({
  declarations: [],
  imports: [
    PublicModule
  ],
  providers: [
    GuestGuard,
    LoggedInGuard
  ]
})
export class GuardsModule {
}
