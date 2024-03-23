const express = require('express');
const pool = require('../DataBase/db')
const router = express.Router();

// Add middleware to parse JSON bodies
router.use(express.json());

router.post('/sign-up', (req, res) => {
    const { username, email, password } = req.body;
    
    console.log(username + " | " + email + " | " + password);
    
    res.send('Received');
});

router.post("/insertUser", async (req, res) => {
    const { username, email, password , role} = req.body;
    console.log(username + " | " + email + " | " + password);

    try {
        const insertUser = await pool.query("INSERT INTO Users(username, email, password, role) VALUES ($1, $2, $3, $4)", [username, email, password, role]);
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

router.post("/checkLogin",async(req,res)=>{
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

router.post("/adminLogin",async(req,res)=>{
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


module.exports = router;
