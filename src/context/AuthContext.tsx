
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signOut, Auth, getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase'; // Import the initialized app
import { users, User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  auth: Auth; // Provide the auth instance
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize auth inside the context provider
const auth = getAuth(app);

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
