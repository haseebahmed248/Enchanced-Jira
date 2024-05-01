import React, { createContext, useEffect, useState } from 'react';

export const AccountContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({ 
        loggedIn: null,
        token: localStorage.getItem('token'),
    });
    
    return (
        <AccountContext.Provider value={ {user,setUser} }>
            {children}
        </AccountContext.Provider>
    );
}

export default UserContextProvider;