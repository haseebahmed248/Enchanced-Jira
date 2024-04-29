const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis').default;
const {createClient}= require('redis');
const client = redis.createClient();
const dotenv = require('dotenv');
dotenv.config();

let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({ 
    client: redisClient,
    prefix:"myapp:",
 });

const sessionMiddleware = session({
    store: redisStore,
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: true,
    name: "YUMM_COOKIE",
    cookie: {
        httpOnly: true,
        // expires: 1000 * 60 * 24 * 7,
        expires:1000,
        secure: "auto", 
        sameSite: "lax"
    }
});

const wrap = (expressMiddleware) => (socket, next) => expressMiddleware(socket.request, {}, next);

const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
};

module.exports = { sessionMiddleware, wrap, corsConfig };