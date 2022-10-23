import * as admin from 'firebase-admin';

export const fireApp = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
});

export const fireAuth = fireApp.auth();
export const fireStore = fireApp.firestore();
