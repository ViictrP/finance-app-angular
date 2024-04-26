import { importProvidersFrom } from '@angular/core';
import { FirebaseAppModule, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AuthModule } from '@angular/fire/auth';

export const firebaseAppModules = [
  AuthModule,
  FirebaseAppModule
];

export const firebaseAppConfig =  importProvidersFrom([
  provideFirebaseApp(() => initializeApp({
    projectId: "my-test-project"
  })),
]);
