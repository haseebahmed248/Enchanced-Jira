const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
const pool = require('./DataBase/db')

const PORT = 4000;

const app = express();

app.use(cors({
    origin:'*'
}))
app.use(bodyParser.json())
app.use('/',router);

app.post("/insertUser", async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username + " | " + email + " | " + password);

    try {
        const insertUser = await pool.query("INSERT INTO Users(username, email, password) VALUES ($1, $2, $3)", [username, email, password]);
        res.send("User inserted successfully").status(200);
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).send("Error inserting user");
    }
});


app.listen(PORT,(Req,res)=>{
    console.log(`Servier is Listening to Port ${PORT}`);
})
