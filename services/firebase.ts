import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCRx3wX4z4cPPb6OAoJUCmHn_U5Prcamj8",
  authDomain: "eventsync-3c032.firebaseapp.com",
  projectId: "eventsync-3c032",
  storageBucket: "eventsync-3c032.firebasestorage.app",
  messagingSenderId: "430329802156",
  appId: "1:430329802156:web:bf7e89943feff2bfedde09",
  measurementId: "G-NQFLENR8JT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);