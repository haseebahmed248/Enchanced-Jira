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
const multer = require('multer')
const path = require('path')
// Add middleware to parse JSON bodies
router.use(express.json());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        console.log(file);
        const ext = file.mimetype.split('/')[1];
        cb(null,`/${file.originalname}-${Date.now()}.${ext}`);
    }
})
const upload = multer({
    storage: storage,
})
router.use('/uploads', express.static('uploads'));

router.post("/upload/:email", upload.single('file'), async (req, res) => {
    try{
        const image = req.file.filename;
        const userEmail = req.params.email;
        const query = {
            text: "UPDATE users SET image_url = $1 WHERE email = $2",
            values: [image, userEmail]
        };
        const result = await pool.query(query);
        
        if (result.rowCount > 0) {
            res.status(200).json({message: "Image uploaded and user updated successfully"});
        } else {
            res.status(404).json({message: "User not found or update failed"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error uploading image"});
    }
});

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
    const { username, email, password, role, sub, image_url } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updateUser = await pool.query(
            "UPDATE Users SET username = $1, email = $2, password = $3, role = $4, sub = $5, image_url = $6 WHERE email = $7",
            [username, email, hashedPassword, role, sub, image_url, userEmail]
        );
        
        if (updateUser.rowCount > 0) {
            res.status(200).json({message:"User updated successfully",data:updateUser.rows[0]});
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
    const user_id = uuidv4();
    try {
        
        const existingUser = await pool.query("SELECT * FROM Users WHERE sub = $1", [sub]);
        if (existingUser.rows.length > 0) {
            
            return res.status(400).send("Error: sub value already exists.");
        }
        await pool.query("INSERT INTO Users(username, email, role, sub,user_id) VALUES ($1, $2, $3, $4,$5)", [username, email, role, sub,user_id]);
        
        jwtSign({
            email: email,
            username: username,
            role: role,
            id: user_id
        },process.env.SECRET,{expiresIn:'1min'})
        .then(token=>{
            res.json({loggedIn:true,token,email:email}).status(200)
        })
        .catch(err=>{
            console.log(err);
            res.json({loggedIn:false,status:"try Again later"})
        })
    } catch (error) {
        console.error("Error creating new user:", error);
        res.status(500).send("Error creating new user.");
    }
});

router.post('/logout/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;
            const expiredToken = await jwtSign({}, process.env.SECRET, { expiresIn: 0 });
            res.status(200).send({ token: expiredToken, message: "Logged out successfully" });
       
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json("Error logging out");
    }
})







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
        // await sendLoginEmail(getUser.rows[0].email);

        jwtSign({
            email: getUser.rows[0].email,
            username: getUser.rows[0].username,
            role: getUser.rows[0].role,
            id:getUser.rows[0].user_id
        },process.env.SECRET,{expiresIn:'1min'})
        .then(token=>{
            res.json({loggedIn:true,token,data:getUser.rows})
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

        jwtSign({
            email: getUser.rows[0].email,
            username: getUser.rows[0].username,
            role: getUser.rows[0].role,
            id:getUser.rows[0].user_id
        },process.env.SECRET,{expiresIn:'1min'})
        .then(token=>{
            res.json({loggedIn:true,token,data:getUser.rows})
        })
        .catch(err=>{
            console.log(err);
            res.json({loggedIn:false,status:"try Again later"})
        })
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error during login");
    }
});
 
 module.exports = router;