import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('careerforge_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (err) {
      console.error('Failed to fetch user:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, id, name, email: userEmail, role } = response.data;
    localStorage.setItem('careerforge_token', token);
    setToken(token);
    setUser({ id, name, email: userEmail, role });
    return response.data;
  };

  const register = async (name, email, password, role = 'ROLE_USER') => {
    const response = await api.post('/auth/register', { name, email, password, role });
    const { token, id, name: userName, email: userEmail, role: userRole } = response.data;
    localStorage.setItem('careerforge_token', token);
    setToken(token);
    setUser({ id, name: userName, email: userEmail, role: userRole });
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('careerforge_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
