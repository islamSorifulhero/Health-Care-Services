'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  googleLogin: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  nid: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('care_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users: (User & { password: string })[] = JSON.parse(localStorage.getItem('care_users') || '[]');
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      // Demo: allow any valid email/password
      if (email && password.length >= 6) {
        const newUser: User = { id: Date.now().toString(), name: email.split('@')[0], email };
        setUser(newUser);
        localStorage.setItem('care_user', JSON.stringify(newUser));
        return { success: true };
      }
      return { success: false, error: 'Invalid email or password' };
    }
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('care_user', JSON.stringify(safeUser));
    return { success: true };
  };

  const register = async (data: RegisterData) => {
    if (data.password.length < 6) return { success: false, error: 'Password must be at least 6 characters' };
    if (!/[A-Z]/.test(data.password)) return { success: false, error: 'Password must contain at least 1 uppercase letter' };
    if (!/[a-z]/.test(data.password)) return { success: false, error: 'Password must contain at least 1 lowercase letter' };

    const users: (User & { password: string })[] = JSON.parse(localStorage.getItem('care_users') || '[]');
    if (users.find((u) => u.email === data.email)) return { success: false, error: 'Email already registered' };

    const newUser: User = { id: Date.now().toString(), name: data.name, email: data.email, phone: data.phone, nid: data.nid };
    users.push({ ...newUser, password: data.password });
    localStorage.setItem('care_users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('care_user', JSON.stringify(newUser));
    return { success: true };
  };

  const googleLogin = async () => {
    const user: User = { id: 'google-' + Date.now(), name: 'Google User', email: 'user@gmail.com', avatar: '' };
    setUser(user);
    localStorage.setItem('care_user', JSON.stringify(user));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('care_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
