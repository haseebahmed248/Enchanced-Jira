const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const users = require('./Routes/router')
const organization = require('./Routes/organization')


const PORT = 4000;

const app = express();

app.use(cors({
    origin:'*'
}))
app.use(bodyParser.json())
app.use('/users',users);
app.use('/organization',organization)


app.listen(PORT,(Req,res)=>{
    console.log(`Servier is Listening to Port ${PORT}`);
})
