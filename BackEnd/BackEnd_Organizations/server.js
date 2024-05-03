const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const organization = require('./Routes/organization')
const dotenv = require('dotenv')
dotenv.config()
const {corsConfig} = require('./Controller/serveController')
const app = express();
dotenv.config()
const PORT = process.env.PORT;
app.use(cors(corsConfig))
app.use(bodyParser.json())



app.use('/organization',organization)


app.listen(PORT,()=>{
    console.log(`Servier is Listening to Port ${PORT}`);
})
