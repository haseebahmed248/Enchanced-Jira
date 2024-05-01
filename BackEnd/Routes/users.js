const express = require('express');
const pool = require('../DataBase/db')
const router = express.Router();
const bcrypt = require('bcrypt');
const authLogin = require('../Controller/authLogin')
const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const dotenv= require('dotenv');
const jwtSign = require('../Jwt/jwtauth');
dotenv.config();

// Add middleware to parse JSON bodies
router.use(express.json());

router.get('/getsession',(req,res)=>{
    res.send(req.session.user);
})

router.get('/getUsers', async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM Users WHERE role != 'admin'");
        res.json(data.rows).status(200);
    } catch (e) {
        res.json(e).status(500);
    }
})
router.put('/updateUser/:userId', async (req, res) => {
    const userId = req.params.userId; // Retrieve userId from request parameters
    const { username, email, password, role, sub } = req.body;

    try {
        const updateUser = await pool.query(
            "UPDATE Users SET username = $1, email = $2, password = $3, role = $4, sub = $5 WHERE u_id = $6",
            [username, email, password, role, sub, userId]
        );

        if (updateUser.rowCount > 0) {
            res.status(200).send("User updated successfully");
        } else {
            res.status(404).send("User not found or update failed");
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Error updating user");
    }
});
router.delete('/deleteUser/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const deleteUser = await pool.query("DELETE FROM Users WHERE u_id = $1", [userId]);
        
        if (deleteUser.rowCount > 0) {
            res.status(200).send("User deleted successfully");
        } else {
            res.status(404).send("User not found or deletion failed");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Error deleting user: " + error.message); // Send detailed error message
    }
});



router.post('/sign-up', (req, res) => {
    const { username, email, password } = req.body;
    
    console.log(username + " | " + email + " | " + password);
    
    res.send('Received');
});





router.post("/insertUser", async (req, res) => {
    const { username, email, password, role } = req.body;
    const user_id = uuidv4();
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertUser = await pool.query(
            "INSERT INTO Users(username, email, password, role, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [username, email, hashedPassword, role, user_id]
        );

        const getUser = insertUser.rows[0];

        jwtSign({
            email: getUser.email,
            username: getUser.username,
            role: getUser.role,
            id: getUser.user_id
        },process.env.SECRET,{expiresIn:'1min'})
        .then(token=>{
            res.json({loggedIn:true,token})
        })
        .catch(err=>{
            console.log(err);
            res.json({loggedIn:false,status:"try Again later"})
        })
    } catch (error) {
        if (error.constraint === 'unique_email') {
            res.status(400).send("Error: Email already registered");
        } else {
            console.error("Error inserting user:", error);
            res.status(500).send("Error inserting user");
        }
    }
});

router.post('/insertUserSub', async (req, res) => {
    const { username, email, role, sub } = req.body;
    try {
        // Check if the "sub" value already exists in the database
        const existingUser = await pool.query("SELECT * FROM Users WHERE sub = $1", [sub]);
        if (existingUser.rows.length > 0) {
            // Return an error response if the "sub" value already exists
            return res.status(400).send("Error: sub value already exists.");
        }

        // If "sub" value is unique, insert the new user
        const insertUser = await pool.query("INSERT INTO Users(username, email, role, sub) VALUES ($1, $2, $3, $4)", [username, email, role, sub]);
        if (insertUser.rowCount > 0) {
            res.status(200).send("User created successfully.");
        } else {
            res.status(500).send("Error creating new user.");
        }
    } catch (error) {
        console.error("Error creating new user:", error);
        res.status(500).send("Error creating new user.");
    }
});





router
.route("/checkLogin")
.get(authLogin.handleLogin)
.post( async (req, res) => {
    const { email, password } = req.body;
    try {
        const getUser = await pool.query("SELECT * FROM Users WHERE email=$1", [email]);
        if (getUser.rows.length === 0) {
            return res.status(401).send("Invalid email or password");
        }
        const validPassword = await bcrypt.compare(password, getUser.rows[0].password);
        if (!validPassword) {
            return res.status(401).send("Invalid email or password");
        }
        jwtSign({
            email: getUser.rows[0].email,
            username: getUser.rows[0].username,
            role: getUser.rows[0].role,
            id:getUser.rows[0].user_id
        },process.env.SECRET,{expiresIn:'1min'})
        .then(token=>{
            res.json({loggedIn:true,token})
        })
        .catch(err=>{
            console.log(err);
            res.json({loggedIn:false,status:"try Again later"})
        })
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({message:"Error Logging-In",
        loggedIn:false});
    }
});



router.post('/checkLoginSub', async (req, res) => {
    const { sub } = req.body; 
    try {
        
        const getUser = await pool.query("SELECT * FROM Users WHERE sub=$1", [sub]);

        
        if (getUser.rows.length === 0) {
            return res.status(401).send("Invalid sub value");
        }

       
        const user = getUser.rows[0];

       
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            sub: user.sub
        };

     
        res.status(200).send({
            message: "Logged in successfully",
            user: req.session.user
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error during login");
    }
});



 
 module.exports = router;
