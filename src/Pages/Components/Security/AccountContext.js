import React, { createContext } from 'react';
import { useState,useEffect } from 'react';
export const AccountContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({ loggedIn: null });
    
    useEffect(() => {
        fetch("http://localhost:4000/users/checkLogin", {
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUser({ loggedIn: true });
            console.log("user loggedin True");
        })
        .catch(error => {
            setUser({ loggedIn: false });
            console.log("user loggedin False");
            console.error('There has been a problem with your fetch operation:', error);
        });
    }, []);

    return (
        <AccountContext.Provider value={ [user,setUser] }>
            {children}
        </AccountContext.Provider>
    );
}

export default UserContextProvider;