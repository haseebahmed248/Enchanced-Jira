import { io } from "socket.io-client";

const Socket = user => new io("http://localhost:4003", {
    autoConnect: false,
    withCredentials: true,
    auth:{
        token: user.token
    }
});

export default Socket;