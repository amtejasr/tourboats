
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { users, User } from '@/lib/auth';

// Define a type for the login function's return value
type LoginResult = {
  success: boolean;
  user?: User;
  error?: string;
};

// Define a type for the signup function's return value
type SignupResult = {
  success: boolean;
  user?: User;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<LoginResult>;
  signup: (name: string, email: string, pass: string) => Promise<SignupResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Key for storing user data in localStorage
const AUTH_STORAGE_KEY = 'azure-yachts-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On initial load, check for a logged-in user in localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, pass: string): Promise<LoginResult> => {
    setLoading(true);
    // Simulate network delay
    await new Promise(res => setTimeout(res, 500));

    const foundUser = users.find(u => u.email === email);

    if (foundUser && foundUser.password === pass) {
      const userToStore: User = { ...foundUser };
      // Do not store the password in the context or localStorage
      delete (userToStore as any).password; 

      setUser(userToStore);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userToStore));
      setLoading(false);
      return { success: true, user: userToStore };
    }

    setLoading(false);
    return { success: false, error: 'Invalid email or password.' };
  }, []);
  
  const signup = useCallback(async (name: string, email: string, pass: string): Promise<SignupResult> => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));

    const existingUser = users.find(u => u.email === email);
    if(existingUser) {
      setLoading(false);
      return { success: false, error: 'An account with this email already exists.' };
    }
    
    // In a real app, you would save the new user to the database.
    // Here we just create them in memory for the session.
    const newUser: User = {
        id: (users.length + 1).toString(),
        name,
        email,
        role: 'customer'
    };

    // This is not a persistent signup, as we are not modifying the source `users` array.
    // This user will exist only for the current session.
    
    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setLoading(false);
    return { success: true, user: newUser };
  }, []);


  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const value = { user, loading, login, signup, logout };

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
