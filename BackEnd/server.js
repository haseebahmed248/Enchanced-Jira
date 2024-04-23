
const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const users = require('./Routes/users')
const organization = require('./Routes/organization')
const admin = require('./Routes/admin')
const dotenv = require('dotenv')
dotenv.config()


const PORT = process.env.PORT;

const app = express();

app.use(cors({
    origin:'*'
}))
const session = require('express-session');


app.use(session({
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
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
