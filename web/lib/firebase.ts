import {
  getAnalytics as _getAnalytics,
  isSupported,
  logEvent,
} from 'firebase/analytics';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { browserLocalPersistence, getAuth } from 'firebase/auth';
import { Tail } from 'web/lib/types';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let fireApp: FirebaseApp;

if (getApps().length > 0) {
  fireApp = getApp('default');
} else {
  fireApp = initializeApp(firebaseConfig, 'default');
}

export const app = fireApp;
export const auth = getAuth(app);

export const getAnalytics = async () => {
  if (await isSupported()) {
    return _getAnalytics(app);
  }
  return null;
};

export const getAnalyticsAndlogEvent = async (
  ...params: Tail<Parameters<typeof logEvent>>
) => {
  const analytics = await getAnalytics();

  if (analytics) {
    logEvent(analytics, ...params);
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises -- This is intentional
auth.setPersistence(browserLocalPersistence);
