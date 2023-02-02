import React, { useState } from 'react';

export const UserContext = React.createContext();

export function ContextProvider({ children }) {
  
  const data = { message: "Hello from context!" }

  const [passwordType, setPasswordType] = useState('password');
  const handleEyeClick = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <UserContext.Provider value={{ data, passwordType, setPasswordType, handleEyeClick }}>
      {children}
    </UserContext.Provider>
  );
}
