export const environment = {
  production: true,
  firebaseConfig: {
    apiUrl: process.env['apiUrl'],
    apiKey: process.env['apiKey'],
    authDomain: process.env['authDomain'],
    projectId: process.env['projectId'],
    storageBucket: process.env['storageBucket'],
    MESSAGING_SENDER_ID: process.env['MESSAGING_SENDER_ID'],
    appId: process.env['appId'],
    measurementId: process.env['measurementId']
  }
};
