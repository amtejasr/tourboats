// src/lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHbHwukrgMutAH_rsYs2HG36O11rcdeK4",
  authDomain: "azure-yachts-dubai.firebaseapp.com",
  projectId: "azure-yachts-dubai",
  storageBucket: "azure-yachts-dubai.firebasestorage.app",
  messagingSenderId: "339162013087",
  appId: "1:339162013087:web:6663c98600f8066925b1aa",
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
