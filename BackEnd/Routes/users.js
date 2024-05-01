const express = require('express');
const pool = require('../DataBase/db')
const router = express.Router();
const bcrypt = require('bcrypt');
const authLogin = require('../Controller/authLogin')


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
router.get('/getUserByEmail/:email', async (req, res) => {
    const userEmail = req.params.email; // Retrieve user email from request parameters

    try {
        const query = {
            text: "SELECT * FROM Users WHERE email = $1 AND role != 'admin'",
            values: [userEmail]
        };

        const data = await pool.query(query);
        if (data.rows.length === 0) {
            return res.status(404).json({ message: 'User not found', email: userEmail });
        }
        
        res.status(200).json(data.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.put('/updateUser/:email', async (req, res) => {
    const userEmail = req.params.email; // Retrieve user email from request parameters
    const { username, email, password, role, sub } = req.body;

    try {
        const updateUser = await pool.query(
            "UPDATE Users SET username = $1, email = $2, password = $3, role = $4, sub = $5 WHERE email = $6",
            [username, email, password, role, sub, userEmail]
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

router.get('/getOrganizationsOfUserByEmail/:email', async (req, res) => {
    const userEmail = req.params.email;

    try {
        const userQuery = {
            text: "SELECT u_id FROM users WHERE email = $1",
            values: [userEmail]
        };

        const userData = await pool.query(userQuery);

        if (userData.rows.length === 0) {
            return res.status(404).json({ message: 'User not found', email: userEmail });
        }

        const userId = userData.rows[0].u_id;

        const query = {
            text: `SELECT organizations.org_id, organizations.title,organizations.image_url
                   FROM organizations 
                   JOIN usr_org ON organizations.org_id = usr_org.org_id 
                   WHERE usr_org.u_id = $1`,
            values: [userId]
        };

        const organizations = await pool.query(query);
        res.status(200).json(organizations.rows);
    } catch (error) {
        console.error("Error fetching organizations of user by email:", error);
        res.status(500).send("Error fetching organizations of user by email");
    }
});

router.post('/addUserInOrganizationByEmail/:organizationId', async (req, res) => {
    const { email } = req.body;
    const organizationId = req.params.organizationId;
  
    try {
      const userQuery = {
        text: "SELECT u_id FROM users WHERE email = $1",
        values: [email]
      };
  
      const userData = await pool.query(userQuery);
  
      if (userData.rows.length === 0) {
        return res.status(404).json({ message: 'User not found', email });
      }
  
      const userId = userData.rows[0].u_id;
  
      const existingUserQuery = {
        text: "SELECT * FROM usr_org WHERE u_id = $1 AND org_id = $2",
        values: [userId, organizationId]
      };
  
      const existingUser = await pool.query(existingUserQuery);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: 'User is already added to the organization' });
      }
  
      const insertQuery = {
        text: "INSERT INTO usr_org (u_id, org_id) VALUES ($1, $2)",
        values: [userId, organizationId]
      };
  
      await pool.query(insertQuery);
  
      res.status(200).send("User added to organization successfully");
    } catch (error) {
      console.error("Error adding user to organization by email:", error);
      res.status(500).send("Error adding user to organization by email");
    }
  });
  




router.get('/getUnassociatedOrganizationsByEmail/:email', async (req, res) => {
    const userEmail = req.params.email;
    console.log("User email:", userEmail);
    try {
        // Get user ID
        const userQuery = {
            text: "SELECT u_id FROM users WHERE email = $1",
            values: [userEmail]
        };
        const userData = await pool.query(userQuery);
        if (userData.rows.length === 0) {
            return res.status(404).json({ message: 'User not found', email: userEmail });
        }
        const userId = userData.rows[0].u_id;

        // Fetch organizations not associated with the user
        const query = {
            text: `SELECT org_id, title,organizations.image_url
                   FROM organizations 
                   WHERE org_id NOT IN (
                       SELECT org_id FROM usr_org WHERE u_id = $1
                   )`,
            values: [userId]
        };
        const organizations = await pool.query(query);
        res.status(200).json(organizations.rows);
    } catch (error) {
        console.error("Error fetching unassociated organizations by email:", error);
        res.status(500).send("Error fetching unassociated organizations by email");
    }
});


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
            username: req.body.username,
            email: req.body.email,
            role: req.body.role
        };
        res.status(200).send("User inserted successfully");
    } catch (error) {
       
        if (error.constraint === 'unique_email') {
            res.status(400).send("Error: Email already registered");
        } else {
            console.error("Error inserting user:", error);
            res.status(500).send("Error inserting user",error);
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

router.post('/logout/:email', (req, res) => {
    // try {
        const userEmail = req.params.email.toLowerCase().trim(); // Convert to lowercase and trim whitespace
        
        // Log the session to check if it exists
        console.log("Session before destruction:", req.session);

        // Check if the user is logged in with the provided email
    //     if (req.session.user && req.session.user.email === userEmail) {
    //         req.session.destroy(); // Destroy the session
    //         return res.status(200).send("Logged out successfully");
    //     } else {
    //         // If the user is not logged in with the provided email, send an error response
    //         return res.status(400).send("Invalid email or user not logged in");
    //     }
    // } catch (error) {
    //     console.error("Error logging out:", error);
    //     res.status(500).send("Error logging out");
    // }
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
        
       
        req.session.user = {
            id: getUser.rows[0].u_id,
            email: getUser.rows[0].email,
            username: getUser.rows[0].username,
            role: getUser.rows[0].role,
        };
        
       
        res.status(200).json({data: getUser.rows, loggedIn:true});
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



 
 module.exports = router;