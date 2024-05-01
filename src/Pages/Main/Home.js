import React, { useContext, useEffect, useState } from 'react'
import J_AppBar from '../Components/J_AppBar'
import '../CSS/Home.css'
import Sidebar from '../Components/SideBar'
import SocketCon from '../Components/Socket'
import { AccountContext } from '../Components/Security/AccountContext'
import OrganizationMember from '../Components/OrganizationMember'
import UseSocket from '../Components/UseSocket'
export const SocketContext = React.createContext();

export default function Home(){
    const {user} = useContext(AccountContext);
    const [socket,setSocket] = useState(
        ()=> SocketCon(user)
    );
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        setSocket(()=>SocketCon(user))
        console.log(user.token+ " socket value is: ")
        console.log(socket)}
        ,[user]
    );

    useEffect(() => {
        fetch('http://localhost:4000/users/getUsers')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUsers(data)});
    }, []);

    UseSocket(socket);
    return (
        <div className='home--container'>
            <SocketContext.Provider value={{socket}}>
            <J_AppBar />
            <Sidebar />
            <OrganizationMember users={users}/>
            </SocketContext.Provider>
        </div>
    )
}