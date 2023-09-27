import React, { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode'; // Import the jwt-decode library

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  // Check for the 'jwtToken' in localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // If the token is present, decode it to get the user information
      const decoded = jwt_decode(token);
      setAuthenticatedUser(decoded);
    }
  }, []);

  const login = (userData) => {
    setAuthenticatedUser(userData);
  };

  const logout = () => {
    // Remove the 'jwtToken' from localStorage when the user logs out
    localStorage.removeItem('jwtToken');
    setAuthenticatedUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticatedUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};