import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './components/app.component';
import {RoutingModule} from './routing.module';
import {PublicModule} from './public/public.module';
import {SecureModule} from './secure/secure.module';
import {GuardsModule} from './guards/guards.module';
import {registerLocaleData} from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    GuardsModule,
    PublicModule,
    SecureModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
