import React, { createContext, useContext, useState } from "react";

const LogoContext = createContext();

export const LogoProvider = ({ children }) => {
  const [logo, setLogo] = useState("/default-logo.png"); // Default logo
  return (
    <LogoContext.Provider value={{ logo, setLogo }}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => useContext(LogoContext);
