import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {routing} from './app.routing.module';
import {PublicModule} from './public/public.module';
import {SecureModule} from './secure/secure.module';
import {GuardsModule} from './guards/guards.module';

@NgModule({
  declarations: [
    AppComponent
  ],
	imports: [
    routing,
		BrowserModule,
    GuardsModule,
    PublicModule,
    SecureModule
	],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
