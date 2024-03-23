const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')

const PORT = 4000;

const app = express();

app.use(cors({
    origin:'*'
}))
app.use(bodyParser.json())
app.use('/',router);

app.listen(PORT,(Req,res)=>{
    console.log(`Servier is Listening to Port ${PORT}`);
})
