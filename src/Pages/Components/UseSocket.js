import { AccountContext } from "./Security/AccountContext";
const { useEffect, useContext } = require("react")



const UseSocket = (socket)=>{
    const {user,setUser} = useContext(AccountContext)
    useEffect(()=>{
        socket.connect();
        console.log(socket);
        socket.on("connect_error",()=>{
            setUser({loggedIn: false})
        })
        return ()=>{
            socket.off('connect_error');
        }
    },[user,socket]);
}

export default UseSocket;