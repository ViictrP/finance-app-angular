import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PlatformModule } from '@angular/cdk/platform';
import { AppComponent } from './components/app.component';
import { RoutingModule } from './routing.module';
import { PublicModule } from './public/public.module';
import { SecureModule } from './secure/secure.module';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { LibModule } from './lib/lib.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './components/not-found/not-found.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PlatformModule,
    RoutingModule,
    PublicModule,
    SecureModule,
    LibModule,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
