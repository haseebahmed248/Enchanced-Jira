import React, { useContext, useEffect, useState } from 'react'
import J_AppBar from '../Components/J_AppBar'
import '../CSS/Home.css'
import Sidebar from '../Components/SideBar'
import SocketCon from '../Components/Socket'
import { AccountContext } from '../Components/Security/AccountContext'
import OrganizationMember from '../Components/OrganizationMember'
import UseSocket from '../Components/UseSocket'
export const SocketContext = React.createContext();
import { useLocation } from 'react-router-dom';
export const MessageContext = React.createContext();

export default function Home(){
    const {user,setFriends,friends,selectedOrgId} = useContext(AccountContext);
    const location = useLocation();
  const organizationId = location.state ? location.state.orgId : null;
    const [socket,setSocket] = useState(
        ()=> SocketCon(user)
    );
    const [users, setUsers] = useState([]);
    const  [messages,setMessages] = useState([]);
    
    useEffect(()=>{
        setSocket(()=>SocketCon(user))
        console.log(user.token+ " socket value is: ")
        console.log(socket)
    }
        ,[user]
    );
    
    useEffect(() => {
        fetch(`http://localhost:4001/organization/organization-details/${selectedOrgId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUsers(data.users)
            }
            );
    }, []);

    UseSocket(socket);
    return (
        <div className='home--container'>
            <SocketContext.Provider value={{socket}}>
            <MessageContext.Provider value={{messages,setMessages}}>
                <J_AppBar />
                    <AccountContext.Provider value={{friends,setFriends}}>
                        <Sidebar />
                    </AccountContext.Provider>
                <OrganizationMember users={users}/>
                </MessageContext.Provider>
            <J_AppBar />
            </SocketContext.Provider>
        </div>
    )
}