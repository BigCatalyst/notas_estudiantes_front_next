"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(
    //{ user:null, roles:[], login:()=>{}, logout:()=>{} }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);


  const login = (userData, userRoles) => {
    setUser(userData);
    setRoles(userRoles);
  };

  const logout = () => {
    setUser(null);
    setRoles([]);
  };

  return (
    <>
    <AuthContext.Provider value={{ user, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
    </>
    
  );
};

export const useAuth = () => useContext(AuthContext);