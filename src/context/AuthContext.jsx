import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem('toy_store_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = { 
          id: 'u1', 
          name: email.split('@')[0], 
          email, 
          role: 'user',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };
        setUser(userData);
        localStorage.setItem('toy_store_user', JSON.stringify(userData));
        toast.success(`Welcome back, ${userData.name}! 🧸`);
        resolve(userData);
      }, 1000);
    });
  };

  const signup = async (name, email, password) => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = { 
          id: Date.now().toString(), 
          name, 
          email, 
          role: 'user',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };
        setUser(userData);
        localStorage.setItem('toy_store_user', JSON.stringify(userData));
        toast.success(`Welcome to ToyStore, ${name}! 🚀`);
        resolve(userData);
      }, 1200);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('toy_store_user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
