
import { MessageContext } from "../../App";
import { AccountContext } from "./Security/AccountContext";
const { useEffect, useContext } = require("react")

const UseSocket = (socket) => {
    const { user, setUser } = useContext(AccountContext)
    const { friends, setFriends } = useContext(AccountContext)
    const {messages,setMessages} = useContext(MessageContext);
    
    useEffect(() => {
        socket.connect();
        socket.on("friends", friendList => {
            console.log("got friends", friendList)
            setFriends(friendList);
        })
        socket.on("private_dm", ({ senderUserId, recipientUserId, message }) => {
            console.log(`Received message from ${senderUserId} to ${recipientUserId}: ${message}`);
            setMessages(prevMessages => [...prevMessages, [message]])
            console.log("Message setting: ", messages);
            // Here you can add the message to your application's state, display it in the UI, etc.
        });
        console.log(socket);
        socket.on("connect_error", () => {
            setUser({ loggedIn: false })
        })
        return () => {
            socket.off('connect_error');
            socket.off('private_dm');
        }
    }, [user, socket]);
    useEffect(()=>{
        console.log("Messages setupped: ",messages)
    })
    // Log the new state after it's updated
    useEffect(() => {
        console.log("setFriends ", friends);
    }, [friends]);
}

export default UseSocket;