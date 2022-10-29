import * as admin from 'firebase-admin';
import { app } from 'firebase-admin';

let fireApp: app.App;

if (admin.apps.length) {
  fireApp = admin.app();
} else {
  fireApp = admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  });
}

export const fireAuth = fireApp.auth();
export const fireStore = fireApp.firestore();

export default fireApp;
