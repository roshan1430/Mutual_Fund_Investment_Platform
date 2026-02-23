import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (name: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('mf_current_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const getUsers = (): StoredUser[] => {
    const data = localStorage.getItem('mf_users');
    return data ? JSON.parse(data) : [];
  };

  const register = (name: string, email: string, password: string) => {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }
    users.push({ name, email, password });
    localStorage.setItem('mf_users', JSON.stringify(users));
    return { success: true, message: 'Registration successful' };
  };

  const login = (email: string, password: string) => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      return { success: false, message: 'Invalid email or password' };
    }
    const currentUser = { email: found.email, name: found.name };
    setUser(currentUser);
    localStorage.setItem('mf_current_user', JSON.stringify(currentUser));
    return { success: true, message: 'Login successful' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mf_current_user');
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
