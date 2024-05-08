const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const users = require('./Routes/users')
const dotenv = require('dotenv')
dotenv.config()
const {corsConfig} = require('./Controller/serveController')
const jwt = require('jsonwebtoken');
const app = express();
const {Server} = require("socket.io");
const server = require("http").createServer(app);
const addFriend = require('./Controller/Socketio/addFriend');
const initializeUser = require('./Controller/Socketio/initlizeUser');
const path = require('path')
const io = new Server(server,{
    cors:corsConfig
})
dotenv.config()
const PORT = process.env.PORT;
app.use(cors(corsConfig))
app.use(bodyParser.json())


const userSockets = {};  //change this


app.use('/users',users);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token){
        jwt.verify(socket.handshake.auth.token, process.env.SECRET, function(err, decoded) {
            if (err){ 
                console.log(err)
                return next(new Error('Authentication error'))};
            socket.decoded = decoded;
            console.log("decoded id: "+decoded.id);
            next();
        });
    }
    else {
        next(new Error('Authentication error'));
        console.log("error on auth")
        console.log(socket.handshake.auth)
    }    
});

io.on('connect', socket => {
    initializeUser(socket)
    console.log("connected", socket.decoded.id); // Access userId from decoded object

    // Add user to userSockets
    userSockets[socket.decoded.id] = socket.id;

    socket.on('add_friend', (name, cb) => addFriend(name, cb, socket ))
    socket.on('private_dm', (data, cb) => {
        console.log("userSockets: ", userSockets);
        let parsedData;
        try {
            parsedData = JSON.parse(data);
        } catch (error) {
            console.error("Error parsing data:", error);
            return;
        }
        const { recipientUserId, message } = parsedData;
        const recipientSocketId = userSockets[recipientUserId];
        if (recipientSocketId) {
            // Send the message to the recipient
            io.to(recipientSocketId).emit('private_dm', { senderUserId: socket.decoded.id, recipientUserId, message });
            console.log("message sent")
            cb({done: true,sent:"Sent"});
        } else {
            console.log("message not sent", recipientUserId)
            console.log("object: ",data)
            cb({ status: 'error', error: 'Recipient not online' });
        }
    });

    // Remove user from userSockets when they disconnect
    socket.on('disconnect', () => {
        delete userSockets[socket.decoded.id];
    });
});


server.listen(PORT,()=>{
    console.log(`Servier is Listening to Port ${PORT}`);
})
