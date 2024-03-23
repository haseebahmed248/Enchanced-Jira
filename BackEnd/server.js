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
        if (error.constraint === 'unique_email') {
            res.status(400).send("Error: Email already registered");
        } else {
            console.error("Error inserting user:", error);
            res.status(500).send("Error inserting user");
        }
    }
});

app.post("/checkLogin",async(req,res)=>{
    const { email, password } = req.body;

try {
    const getUser = await pool.query("SELECT * FROM Users WHERE email=$1", [email]);
    if (getUser.rows.length === 0) {
        return res.status(401).send("Invalid email or password");
    }
    if (password != getUser.rows[0].password) {
        return res.status(401).send("Invalid email or password");
    }
    res.status(200).send("Logged-In");
} catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
}
})

app.post("/adminLogin",async(req,res)=>{
    const { username, password } = req.body;

try {
    const getUser = await pool.query("SELECT * FROM Users WHERE username=$1", [username]);
    if (getUser.rows.length === 0) {
        return res.status(401).send("Invalid email or password");
    }
    if (password != getUser.rows[0].password) {
        return res.status(401).send("Invalid email or password");
    }
    if(getUser.rows[0].role != "Admin"){
        return res.status(401).send("Invalid email or password");
    }
    res.status(200).send("Logged-In");
} catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
}
})


app.listen(PORT,(Req,res)=>{
    console.log(`Servier is Listening to Port ${PORT}`);
})
