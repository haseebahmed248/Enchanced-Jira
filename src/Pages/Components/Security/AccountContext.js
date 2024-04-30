import React, { createContext } from 'react';
import { useState,useEffect } from 'react';
export const AccountContext = createContext();

const UserContextProvider = ({ children }) => {
    const user = { loggedIn: null };
    
    

    return (
        <AccountContext.Provider value={ user }>
            {children}
        </AccountContext.Provider>
    );
}

export default UserContextProvider;