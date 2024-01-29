export const environment = {
  production: true,
  firebaseConfig: {
    apiUrl: process.env['API_URL'] as string,
    apiKey: process.env['API_KEY'] as string,
    authDomain: process.env['AUTH_DOMAIN'] as string,
    projectId: process.env['PROJECT_ID'] as string,
    storageBucket: process.env['STORAGE_BUCKET'] as string,
    MESSAGING_SENDER_ID: process.env['MESSAGING_SENDER_ID'],
    appId: process.env['APP_ID'],
    measurementId: process.env['MEASUREMENT_ID'],
  }
};
