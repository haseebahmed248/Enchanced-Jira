import Socket from "./Socket";
import { AccountContext } from "./Security/AccountContext";
const { useEffect, useContext } = require("react")



const UseSocket = ()=>{
    const user = useContext(AccountContext)
    useEffect(()=>{
        Socket.connect();
        Socket.on("connect_error",()=>{
            user.loggedIn = false;
        })
        return ()=>{
            Socket.off('connect_error');
        }
    },[user]);
}

export default UseSocket;