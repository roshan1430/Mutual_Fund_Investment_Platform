import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '@/lib/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('mf_current_user') || localStorage.getItem('mf_current_user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      sessionStorage.setItem('mf_current_user', JSON.stringify(parsed));
    }

    const handleStorage = (event) => {
      if (event.key !== 'mf_current_user') return;
      if (event.newValue) {
        const nextUser = JSON.parse(event.newValue);
        setUser(nextUser);
        sessionStorage.setItem('mf_current_user', event.newValue);
      } else {
        setUser(null);
        sessionStorage.removeItem('mf_current_user');
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const getUsers = () => {
    const data = localStorage.getItem('mf_users');
    return data ? JSON.parse(data) : [];
  };

  const register = async (name, email, password) => {
    try {
      await registerUser({ name, email, password });
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      if (response.user) {
        setUser(response.user);
        const currentValue = JSON.stringify(response.user);
        localStorage.setItem('mf_current_user', currentValue);
        sessionStorage.setItem('mf_current_user', currentValue);
      }
      return { success: response.success, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mf_current_user');
    sessionStorage.removeItem('mf_current_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};










