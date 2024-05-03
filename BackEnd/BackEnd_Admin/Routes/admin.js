const express = require('express');
const pool = require('../DataBase/db')
const router = express.Router();

router.post("/adminLogin", async (req, res) => {
    const { username, password } = req.body;

    try {
       
        const getUser = await pool.query("SELECT * FROM Users WHERE username=$1", [username]);
        
        if (getUser.rows.length === 0) {
            return res.status(401).send("Invalid email or password");
        }

       
        
        if (getUser.rows[0].role !== "admin") {
            return res.status(401).send("Invalid email or password");
        }

       
        // req.session.user = {
        //     id: getUser.rows[0].id,
        //     username: getUser.rows[0].username,
        //     email: getUser.rows[0].email,
        //     role: getUser.rows[0].role,
        // };
        
        res.status(200).send({loggedIn:true,message:"Logged-In"});
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in");
    }
});

module.exports = router;
