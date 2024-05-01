
import React, { createContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userId = {email:null,org_id:null};
  
  return (
    <UserContext.Provider value={ userId}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

