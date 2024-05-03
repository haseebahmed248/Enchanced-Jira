const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const admin = require('./Routes/admin')
const dotenv = require('dotenv')
dotenv.config()
const {corsConfig} = require('./Controller/serveController')
const jwt = require('jsonwebtoken');
const app = express();
dotenv.config()
const PORT = process.env.PORT;
app.use(cors(corsConfig))
app.use(bodyParser.json())

app.use('/admin',admin)


app.listen(PORT,()=>{
    console.log(`Servier is Listening to Port ${PORT}`);
})
