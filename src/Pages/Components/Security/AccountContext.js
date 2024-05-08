import React, { createContext, useState } from 'react';

export const AccountContext = createContext();
const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({ 
        loggedIn: null,
        token: localStorage.getItem('token'),
    });
    const [friends,setFriends] = useState([]);
    const [orgUsers,setOrgUsers] = useState([]);
    // const [messages,setMessages] = useState([]);
    const [currentUser,setCurrentUser] = useState({
        email:'',
        id:'',
        username:'',
        image_url:'',
        password: '',
        sub:'',
        role:'',
        user_id:''
      });
    const [selectedOrgId,setSelectedOrgId] = useState('');
    
    return (
        <AccountContext.Provider value={{
            user,setUser,friends,setFriends,orgUsers,setOrgUsers,currentUser,setCurrentUser
        ,selectedOrgId,setSelectedOrgId
        }}>
            {children}
        </AccountContext.Provider>
    );
}

export default UserContextProvider;