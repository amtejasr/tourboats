
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHbHwukrgMutAH_rsYs2HG36O11rcdeK4",
  authDomain: "azure-yachts-dubai.firebaseapp.com",
  projectId: "azure-yachts-dubai",
  storageBucket: "azure-yachts-dubai.firebasestorage.app",
  messagingSenderId: "339162013087",
  appId: "1:339162013087:web:6663c98600f8066925b1aa",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
