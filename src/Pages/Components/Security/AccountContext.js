import React, { createContext, useState } from 'react';

export const AccountContext = createContext();

const UserContextProvider = ({ children }) => {
    const user ={ loggedIn: null };
    const test = "hello";
    return (
        <AccountContext.Provider value={ user}>
            {children}
        </AccountContext.Provider>
    );
}

export default UserContextProvider;
