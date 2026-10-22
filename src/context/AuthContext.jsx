import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const ADMIN_CREDENTIALS = {
  email: 'nilan.infralimited@gmail.com',
  password: 'Nilan@321',
  name: 'Nilan Administrator',
  role: 'Super Administrator',
  avatar: 'NI',
  department: 'Executive Management & Infrastructure'
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('nilan_admin_auth') === 'true' ||
           sessionStorage.getItem('nilan_admin_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('nilan_admin_user') || sessionStorage.getItem('nilan_admin_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ADMIN_CREDENTIALS;
      }
    }
    return isAuthenticated ? ADMIN_CREDENTIALS : null;
  });

  const login = (email, password, rememberMe = true) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() && cleanPassword === ADMIN_CREDENTIALS.password) {
      const userData = {
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        role: ADMIN_CREDENTIALS.role,
        avatar: ADMIN_CREDENTIALS.avatar,
        department: ADMIN_CREDENTIALS.department,
        lastLogin: new Date().toISOString()
      };

      if (rememberMe) {
        localStorage.setItem('nilan_admin_auth', 'true');
        localStorage.setItem('nilan_admin_user', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('nilan_admin_auth', 'true');
        sessionStorage.setItem('nilan_admin_user', JSON.stringify(userData));
      }

      setIsAuthenticated(true);
      setCurrentUser(userData);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid login credentials. Please check your login ID and password.'
    };
  };

  const logout = () => {
    localStorage.removeItem('nilan_admin_auth');
    localStorage.removeItem('nilan_admin_user');
    sessionStorage.removeItem('nilan_admin_auth');
    sessionStorage.removeItem('nilan_admin_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, ADMIN_CREDENTIALS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
