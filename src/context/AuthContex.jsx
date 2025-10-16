import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const response = await axios.get(`${apiUrl}/auth/me`, { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        // Silently fail if user is not logged in
      } finally {
        setLoading(false);
      }
    }
    checkLoginStatus();
  }, [apiUrl]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setUser(null);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}