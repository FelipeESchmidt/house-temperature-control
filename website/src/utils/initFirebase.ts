import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

const app = (() => {
  if (!getApps().length) {
    return initializeApp(config);
  }
  return getApp();
})();

const db = getDatabase(app);

export { app, db };
