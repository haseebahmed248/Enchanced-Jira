const express = require('express');
const pool = require('../DataBase/db')
const router = express.Router();
const bcrypt = require('bcrypt');


// Add middleware to parse JSON bodies
router.use(express.json());

router.get('/getUsers', async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM Users WHERE role != 'admin'");
        res.json(data.rows).status(200);
    } catch (e) {
        res.json(e).status(500);
    }
})



router.post('/sign-up', (req, res) => {
    const { username, email, password } = req.body;
    
    console.log(username + " | " + email + " | " + password);
    
    res.send('Received');
});





router.post("/insertUser", async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
       
        const hashedPassword = await bcrypt.hash(password, 10);
        
       
        const insertUser = await pool.query(
            "INSERT INTO Users(username, email, password, role) VALUES ($1, $2, $3, $4)",
            [username, email, hashedPassword, role]
        );

       
        req.session.user = {
            username,
            email,
            role
        };

       
        res.status(200).send("User inserted successfully");
    } catch (error) {
       
        if (error.constraint === 'unique_email') {
            res.status(400).send("Error: Email already registered");
        } else {
            console.error("Error inserting user:", error);
            res.status(500).send("Error inserting user");
        }
    }
});




router.post('/sign-up', async (req, res) => {
    const { username, email, password, role = 'user' } = req.body;

    try {
       
        const hashedPassword = await bcrypt.hash(password, 10);

      
        const insertUser = await pool.query(
            "INSERT INTO Users(username, email, password, role) VALUES ($1, $2, $3, $4)",
            [username, email, hashedPassword, role]
        );

        
        if (insertUser.rowCount > 0) {
           
            req.session.user = {
                username,
                email,
                role
            };

         
            res.status(200).send("User signed up and session created successfully");
        } else {
            res.status(400).send("Error signing up user");
        }
    } catch (error) {
       
        console.error("Error signing up user:", error);
        res.status(500).send("Error signing up user");
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





router.post("/checkLogin", async (req, res) => {
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
        
       
        req.session.user = {
            id: getUser.rows[0].id,
            email: getUser.rows[0].email,
            username: getUser.rows[0].username,
            role: getUser.rows[0].role,
        };
        
       
        res.status(200).send("Logged-In");
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in");
    }
});

router.post("/adminLogin", async (req, res) => {
    const { username, password } = req.body;

    try {
       
        const getUser = await pool.query("SELECT * FROM Users WHERE username=$1", [username]);
        
        if (getUser.rows.length === 0) {
            return res.status(401).send("Invalid email or password");
        }

       
        const validPassword = await bcrypt.compare(password, getUser.rows[0].password);
        
        if (!validPassword) {
            return res.status(401).send("Invalid email or password");
        }

       
        if (getUser.rows[0].role !== "admin") {
            return res.status(401).send("Invalid email or password");
        }

       
        req.session.user = {
            id: getUser.rows[0].id,
            username: getUser.rows[0].username,
            email: getUser.rows[0].email,
            role: getUser.rows[0].role,
        };
        
        // Send a successful response
        res.status(200).send("Logged-In");
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in");
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
