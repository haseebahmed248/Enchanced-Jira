const express = require('express');
const pool = require('../DataBase/db')
const router = express.Router();

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



// Define the /insertUser route
router.post("/insertUser", async (req, res) => {
    const { username, email, password, role } = req.body;

    // Log user input (for debugging purposes)
    console.log(username + " | " + email + " | " + password);

    try {
        // Insert user data into the Users table in the database
        const insertUser = await pool.query(
            "INSERT INTO Users(username, email, password, role) VALUES ($1, $2, $3, $4)",
            [username, email, password, role]
        );

        // On successful insertion, create a session for the user
        req.session.user = {
            username,
            email,
            role
        };

        // Send a successful response with status code 200
        res.status(200).send("User inserted successfully");
    } catch (error) {
        if (error.constraint === 'unique_email') {
            // Handle unique constraint violation for email
            res.status(400).send("Error: Email already registered");
        } else {
            // Log other errors and respond with a 500 error status code
            console.error("Error inserting user:", error);
            res.status(500).send("Error inserting user");
        }
    }
});
// router.post('/sign-up', (req, res) => {
//     const { username, email, password } = req.body;
    
//     console.log(username + " | " + email + " | " + password);
    
//     res.send('Received');
// });
router.post('/sign-up', async (req, res) => {
    const { username, email, password, role = 'user' } = req.body;

    try {
        // Insert user data into the Users table in the database
        const insertUser = await pool.query(
            "INSERT INTO Users(username, email, password, role) VALUES ($1, $2, $3, $4)",
            [username, email, password, role]
        );

        // Check if the insertion was successful
        if (insertUser.rowCount > 0) {
            // If insertion is successful, create a session for the user
            req.session.user = {
                username,
                email,
                role
            };

            // Send a successful response with status code 200
            res.status(200).send("User signed up and session created successfully");
        } else {
            // If insertion was not successful, send a response with status code 400
            res.status(400).send("Error signing up user");
        }
    } catch (error) {
        // Handle any errors that occurred during the process
        console.error("Error signing up user:", error);
        res.status(500).send("Error signing up user");
    }
});

// router.post("/insertUser", async (req, res) => {
//     const { username, email, password , role} = req.body;
//     console.log(username + " | " + email + " | " + password);

//     try {
//         const insertUser = await pool.query("INSERT INTO Users(username, email, password, role) VALUES ($1, $2, $3, $4)", [username, email, password, role]);
//         res.send("User inserted successfully").status(200);
//     } catch (error) {
//         if (error.constraint === 'unique_email') {
//             res.status(400).send("Error: Email already registered");
//         } else {
//             console.error("Error inserting user:", error);
//             res.status(500).send("Error inserting user");
//         }
//     }
// });
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

// router.post('/insertUserSub',async(req,res)=>{
//     const { username, email, role,sub } = req.body;
//     try {
//         const insertUser = await pool.query("INSERT INTO Users(username, email, role, sub) VALUES ($1, $2, $3, $4)", [username, email, role,sub]);
//         if(insertUser.rowCount > 0){
//         res.send(insertUser.rows).status(200);
//         }else{
//             res.send("erorr creating new user").status(401);
//         }
//     } catch (error) {
//         console.error("Error logging in:", error);
//         res.status(500).send("Error logging in");
//     }
// })



// router.post("/checkLogin",async(req,res)=>{
//     const { email, password } = req.body;
// try {
//     const getUser = await pool.query("SELECT * FROM Users WHERE email=$1", [email]);
//     if (getUser.rows.length === 0) {
//         return res.status(401).send("Invalid email or password");
//     }
//     if (password != getUser.rows[0].password) {
//         return res.status(401).send("Invalid email or password");
//     }
//     res.status(200).send("Logged-In");
// } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).send("Error logging in");
// }

// })

router.post("/checkLogin", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Retrieve the user from the database using the provided email
        const getUser = await pool.query("SELECT * FROM Users WHERE email=$1", [email]);
        
        // Check if a user with the given email was found
        if (getUser.rows.length === 0) {
            return res.status(401).send("Invalid email or password");
        }
        
        // Check if the provided password matches the stored password
        if (password !== getUser.rows[0].password) {
            return res.status(401).send("Invalid email or password");
        }
        
        // User authentication successful
        // Create a session for the authenticated user
        req.session.user = {
            id: getUser.rows[0].id, // Assuming `id` is a field in your Users table
            email: getUser.rows[0].email,
            username: getUser.rows[0].username,
            role: getUser.rows[0].role,
            // Include any other fields you want to save in the session
        };
        
        // Send a successful response
        res.status(200).send("Logged-In");
    } catch (error) {
        // Log the error and respond with a 500 status code
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in");
    }
});


// router.post('/checkLoginSub',async(req,res)=>{
//     const sub = req.body.sub;
//     try {
//         const getUser = await pool.query("SELECT * FROM Users WHERE sub=$1", [sub]);
//         if (getUser.rows.length === 0) {
//             return res.status(401).send("Invalid email or password");
//         }
//         res.status(200).send(getUser.rows);
//     } catch (error) {
//         console.error("Error logging in:", error);
//         res.status(500).send("Error logging in");
//     }
// })
router.post('/checkLoginSub', async (req, res) => {
    const sub = req.body.sub;
    try {
        // Query the database to find the user by the provided 'sub' value
        const getUser = await pool.query("SELECT * FROM Users WHERE sub=$1", [sub]);

        // If no user is found, respond with an error
        if (getUser.rows.length === 0) {
            return res.status(401).send("Invalid sub value");
        }

        // Set the user session with the authenticated user's information
        const user = getUser.rows[0];
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            sub: user.sub
        };

        // Respond with a success message and the user's information
        res.status(200).send({
            message: "Logged in successfully",
            user: req.session.user
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error during login");
    }
try {
    const getUser = await pool.query("SELECT * FROM Users WHERE username=$1", [username]);
    if (getUser.rows.length === 0) {
        return res.status(401).send("Invalid email or password");
    }
    if (password != getUser.rows[0].password) {
        return res.status(401).send("Invalid email or password");
    }
    if(getUser.rows[0].role != "admin"){
        return res.status(401).send("Invalid email or password");
    }
}
catch(e){
    res.send('error').status(500);
}
});

// router.post("/adminLogin",async(req,res)=>{
//     const { username, password } = req.body;

// try {
//     const getUser = await pool.query("SELECT * FROM Users WHERE username=$1", [username]);
//     if (getUser.rows.length === 0) {
//         return res.status(401).send("Invalid email or password");
//     }
//     if (password != getUser.rows[0].password) {
//         return res.status(401).send("Invalid email or password");
//     }
//     if(getUser.rows[0].role != "Admin"){
//         return res.status(401).send("Invalid email or password");
//     }
//     res.status(200).send("Logged-In");
// } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).send("Error logging in");
// }
// })

router.post("/adminLogin", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query the database for the user with the provided username
        const getUser = await pool.query("SELECT * FROM Users WHERE username=$1", [username]);
        
        // Check if a user with the provided username exists
        if (getUser.rows.length === 0) {
            return res.status(401).send("Invalid email or password");
        }

        // Check if the provided password matches the stored password
        if (password !== getUser.rows[0].password) {
            return res.status(401).send("Invalid email or password");
        }

        // Check if the user has the role of Admin
        if (getUser.rows[0].role !== "admin") {
            return res.status(401).send("Invalid email or password");
        }

        // On successful login, set session data
        req.session.user = {
            id: getUser.rows[0].id,
            username: getUser.rows[0].username,
            email: getUser.rows[0].email,
            role: getUser.rows[0].role
        };

        // Send a successful response with status code 200
        res.status(200).send("Logged-In");
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in");
    }
});

module.exports = router;
