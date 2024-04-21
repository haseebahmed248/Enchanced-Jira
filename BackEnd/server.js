
const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const users = require('./Routes/router')
const organization = require('./Routes/organization')
const dotenv = require('dotenv')
dotenv.config()


const PORT = process.env.PORT;

const app = express();

app.use(cors({
    origin:'*'
}))
const session = require('express-session');


app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false, 
    }
}));

app.use(bodyParser.json())
app.use('/users',users);
app.use('/organization',organization)


app.listen(PORT,()=>{
    console.log(`Servier is Listening to Port ${PORT}`);
})
