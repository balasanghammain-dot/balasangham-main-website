import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD6qeUB8dw7mK8nkDILX4otshzwzjT_2tg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "balasangam-8e562.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "balasangam-8e562",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "balasangam-8e562.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "631062193147",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:631062193147:web:66fa6d049e797e77fc215e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-YPEMK25PD4"
};

// Initialize Firebase once
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);
