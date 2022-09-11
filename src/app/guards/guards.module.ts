import {NgModule} from '@angular/core';
import {GuestGuard} from './guest.guard';
import {LoggedInGuard} from './logged-in.guard';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    GuestGuard,
    LoggedInGuard
  ]
})
export class GuardsModule {
}
