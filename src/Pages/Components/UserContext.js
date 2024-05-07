import React, { createContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children, org_id }) => {
  const userId = { email: null, org_id }; // Pass org_id here
console.log( "org",org_id);
  return (
    <UserContext.Provider value={userId}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
