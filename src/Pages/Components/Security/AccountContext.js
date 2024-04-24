import React, { createContext, useState } from 'react';

export const AccountContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({ loggedIn: null });
    return (
        <AccountContext.Provider value={{ user, setUser }}>
            {children}
        </AccountContext.Provider>
    );
}

export default UserContextProvider;
