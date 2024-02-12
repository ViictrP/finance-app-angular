import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp({
        apiKey: import.meta.env['FNC_APP_API_KEY'],
        authDomain: import.meta.env['FNC_APP_AUTH_DOMAIN'],
        projectId: import.meta.env['FNC_APP_PROJECT_ID'],
        storageBucket: import.meta.env['FNC_APP_STORAGE_BUCKET'],
        messagingSenderId: import.meta.env['FNC_APP_MESSAGING_SENDER_ID'],
        appId: import.meta.env['FNC_APP_APP_ID'],
        measurementId: import.meta.env['FNC_APP_MEASUREMENT_ID'],
      })),
      provideAuth(() => getAuth())
    ]), importProvidersFrom(provideAuth(() => getAuth()))
  ]
};
