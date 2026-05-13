import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
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

  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      const { access_token, user: userData } = res.data;
      
      const fullUserData = {
        ...userData,
        token: access_token,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };

      setUser(fullUserData);
      localStorage.setItem('toy_store_user', JSON.stringify(fullUserData));
      toast.success(`Welcome back, ${userData.name}! 🧸`);
      return fullUserData;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(Array.isArray(message) ? message[0] : message);
      throw error;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(`${API}/auth/signup`, { name, email, password });
      // NestJS auth service returns the user object on signup (without token)
      // So we automatically log them in after signup
      return login(email, password);
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      toast.error(Array.isArray(message) ? message[0] : message);
      throw error;
    }
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
