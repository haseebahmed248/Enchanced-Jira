const { useEffect, useContext } = require("react")
import { AccountContext } from "./Security/AccountContext";
import Socket from "./Socket";

const UseSocket = ()=>{
    const user = useContext(AccountContext)
    useEffect(()=>{
        Socket.connect();
        Socket.on("connect_error",()=>{
            user.loggedIn = false;
        })
        return ()=>{
            //for cleaning
            Socket.off('connect_error');
        }
    },[user]);
}

export default UseSocket;