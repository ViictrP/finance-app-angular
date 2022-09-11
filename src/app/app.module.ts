import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './components/app.component';
import {RoutingModule} from './routing.module';
import {PublicModule} from './public/public.module';
import {SecureModule} from './secure/secure.module';
import {GuardsModule} from './guards/guards.module';

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
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
