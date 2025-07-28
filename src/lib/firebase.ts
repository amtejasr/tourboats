
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';

// Hardcoded Firebase configuration to ensure it's always available.
const firebaseConfig = {
  apiKey: "AIzaSyDHbHwukrgMutAH_rsYs2HG36O11rcdeK4",
  authDomain: "azure-yachts-dubai.firebaseapp.com",
  projectId: "azure-yachts-dubai",
  storageBucket: "azure-yachts-dubai.firebasestorage.app",
  messagingSenderId: "339162013087",
  appId: "1:339162013087:web:6663c98600f8066925b1aa",
};

// Initialize Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
