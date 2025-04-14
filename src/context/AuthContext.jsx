import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [user, setUser] = useState(null); 
  const token = sessionStorage.getItem("authToken"); 

  
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);

      const decodedUser = jwtDecode(token); 
      setUser(decodedUser);
    }
  }, [token]);

  const login = (token, user) => {
    setIsAuthenticated(true);  
    setUser(user);  
    sessionStorage.setItem("authToken", token); 
  };

  const logout = () => {
    setIsAuthenticated(false);  
    setUser(null);  
    sessionStorage.removeItem("authToken"); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};