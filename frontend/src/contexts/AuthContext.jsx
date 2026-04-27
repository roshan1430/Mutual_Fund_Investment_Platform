import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loginUser,
  registerUser,
  resendVerification,
  resetPassword,
  requestPasswordReset,
  verifyEmail,
  verifyLoginOtp,
} from '@/lib/api';

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

  const register = async (name, email, password, role = 'INVESTOR') => {
    try {
      const response = await registerUser({ name, email, password, role });
      return {
        success: response.success,
        message: response.message,
        requiresVerification: response.requiresVerification,
        email: response.email || email,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const confirmEmail = async (email, code) => {
    try {
      const response = await verifyEmail({ email, code });
      return { success: response.success, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const resendCode = async (email) => {
    try {
      const response = await resendVerification({ email });
      return { success: response.success, message: response.message };
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
      return {
        success: response.success,
        message: response.message,
        email: response.email || email,
        nextStep: response.nextStep,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const completeLogin = async (email, otp) => {
    try {
      const response = await verifyLoginOtp({ email, otp });
      if (response.user) {
        setUser(response.user);
        const currentValue = JSON.stringify(response.user);
        localStorage.setItem('mf_current_user', currentValue);
        sessionStorage.setItem('mf_current_user', currentValue);
      }
      return { success: response.success, message: response.message, user: response.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await requestPasswordReset({ email });
      return {
        success: response.success,
        message: response.message,
        email: response.email || email,
        nextStep: response.nextStep,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const confirmPasswordReset = async (email, otp, newPassword) => {
    try {
      const response = await resetPassword({ email, otp, newPassword });
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
    <AuthContext.Provider value={{
      user,
      login,
      completeLogin,
      register,
      confirmEmail,
      resendCode,
      forgotPassword,
      confirmPasswordReset,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'ADMIN',
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};










