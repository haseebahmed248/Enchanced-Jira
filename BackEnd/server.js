const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const users = require('./Routes/users')
const organization = require('./Routes/organization')
const admin = require('./Routes/admin')
const dotenv = require('dotenv')
const {sessionMiddleware,wrap,corsConfig} = require('./Controller/serveController')

const app = express();
const {Server} = require("socket.io")
const server = require("http").createServer(app);
const io = new Server(server,{
    cors:corsConfig
})
dotenv.config()
const PORT = process.env.PORT;
app.use(cors(corsConfig))


app.use(bodyParser.json())
app.use(sessionMiddleware);

app.use('/users',users);
app.use('/organization',organization)
app.use('/admin',admin)

io.use(wrap(sessionMiddleware));
io.on('connect',socket=>{
    console.log("connected",socket.request.session)
})


server.listen(PORT,()=>{
    console.log(`Servier is Listening to Port ${PORT}`);
})
