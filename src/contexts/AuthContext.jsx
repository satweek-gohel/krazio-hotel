import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUserDetails = sessionStorage.getItem('userDetails');

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUserDetails) {
      try {
        const parsedUserDetails = JSON.parse(storedUserDetails);
        setUserDetails(parsedUserDetails);
      } catch (error) {
        console.error('Error parsing user details:', error);
      }
    }

    setIsAuthReady(true);
  }, []);

  const updateToken = (newToken) => {
    setToken(newToken);
    sessionStorage.setItem('token', newToken);
  };

  const updateUserDetails = (details) => {
    setUserDetails(details);
    sessionStorage.setItem('userDetails', JSON.stringify(details));
  };

  const updateUserAddress = (address) => {
    setUserAddress(address);
    sessionStorage.setItem('addresses', JSON.stringify(address));
  };

  const login = (token, userDetails,addresses) => {
    updateToken(token);
    updateUserDetails(userDetails);
    updateUserAddress(addresses);
  };

  const logout = () => {
    setToken('');
    setUserDetails(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userDetails');
    sessionStorage.removeItem('addresses');
  };

  const isAuthenticated = () => {
    return !!sessionStorage.getItem('token');
  };

  const contextValue = {
    token,
    userDetails,
    updateToken,
    updateUserDetails,
    login,
    logout,
    isAuthenticated,
    isAuthReady
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};