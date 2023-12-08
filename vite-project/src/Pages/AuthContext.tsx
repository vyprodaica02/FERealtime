/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, ReactNode, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState("");

  const setAuthData = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
