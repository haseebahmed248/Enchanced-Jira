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
const io = new Server(server,{
    cors:corsConfig
})
dotenv.config()
const PORT = process.env.PORT;
app.use(cors(corsConfig))
app.use(bodyParser.json())

app.use('/users',users);

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
    
    socket.on('add_friend', (name, cb) => addFriend(name, cb, socket ))
});


server.listen(PORT,()=>{
    console.log(`Servier is Listening to Port ${PORT}`);
})
