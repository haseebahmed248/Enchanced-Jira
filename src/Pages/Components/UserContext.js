
import React, { createContext,useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser,setCurrentuser] = useState({
    email:'',
    id:'',
    username:'',
    image_url:'',
  });
  
  return (
    <UserContext.Provider value={ {currentUser,setCurrentuser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

