import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login as apiLogin, logout as apiLogout, register as apiRegister } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) { 
        try {
          const user = await getCurrentUser(token);
          setUser(user);
        } catch (err) {
          console.error(err);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const register = async (userData) => {
    const user = await apiRegister(userData);
    return user;
  };

  const login = async (credentials) => {
    const { user, token } = await apiLogin(credentials);
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
  };

  const logout = async () => {
    await apiLogout(token);
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);