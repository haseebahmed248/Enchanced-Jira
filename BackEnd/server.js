
const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const users = require('./Routes/users')
const organization = require('./Routes/organization')
const admin = require('./Routes/admin')
const dotenv = require('dotenv')
const session = require('express-session');
const redis = require('redis')
const connectRedis = require('connect-redis');
const { default: RedisStore } = require('connect-redis');
dotenv.config()
const PORT = process.env.PORT;

const app = express();

app.use(cors({
    origin:'*'
}))


const redisClient = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
})

app.use(session({
    // store:new RedisStore({client:redisClient}),
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: true,
    name:"YUMM_COOKIE",
    cookie: {
        httpOnly: true,
        expires: 1000 * 60*24*7,
        secure: "auto", 
        sameSite: "lax"
    }
}));

app.use(bodyParser.json())
app.use('/users',users);
app.use('/organization',organization)
app.use('/admin',admin)

app.listen(PORT,()=>{
    console.log(`Servier is Listening to Port ${PORT}`);
})
