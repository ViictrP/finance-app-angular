import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authorizationInterceptor } from './services/interceptors/authorization.interceptor';
import { profileInterceptor } from './services/interceptors/profile.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([authorizationInterceptor, profileInterceptor])),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth())
    ]), importProvidersFrom(provideAuth(() => getAuth()))
  ]
};
