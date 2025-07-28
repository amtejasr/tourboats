
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { onAuthStateChanged, User as FirebaseUser, signOut, getAuth, Auth } from 'firebase/auth';
import { users, User } from '@/lib/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only if it hasn't been initialized yet
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  auth: Auth;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentFirebaseUser) => {
      setFirebaseUser(currentFirebaseUser);
      if (currentFirebaseUser) {
        const appUser = users.find(u => u.email === currentFirebaseUser.email);
        if (appUser) {
          setUser(appUser);
        } else {
            setUser({
                id: currentFirebaseUser.uid,
                name: currentFirebaseUser.displayName || 'New User',
                email: currentFirebaseUser.email!,
                role: 'customer'
            });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setFirebaseUser(null);
    setLoading(false);
  };

  const value = { user, firebaseUser, logout, loading, auth };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
