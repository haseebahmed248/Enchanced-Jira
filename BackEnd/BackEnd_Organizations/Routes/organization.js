const express = require("express");
const pool = require("../DataBase/db");
const router = express.Router();
const bcrypt = require("bcrypt");

const cors = require("cors");



router.get('/all',async(req,res)=>{
    try{
        const allUsers = await pool.query('SELECT * FROM organizations')
        res.json(allUsers.rows)
    }catch(error){
        console.error(error)
        res.json(error)
    }
})

router.get('/joined/:id',async(req,res)=>{
    try{
        const allOrg_ids = await pool.query('SELECT org_id FROM Usr_Org WHERE u_id = $1',[req.params.id])
        const allOrgs = await pool.query('SELECT * FROM organizations WHERE org_id = $1',[allOrg_ids.rows[0].org_id]);
        res.json(allOrgs.rows)
    }catch(error){
        console.error(error)
        res.json(error)
    }
})
// Endpoint to add a new organization
router.post("/organizations", async (req, res) => {
    const { title, description, image_url } = req.body;

    if (!title || !description || !image_url) {
        return res.status(400).send("Title, description, and image_url are required.");
    }

    try {
        const result = await pool.query(
            "INSERT INTO Organizations (title, description, image_url) VALUES ($1, $2, $3)",
            [title, description, image_url]
        );

        if (result.rowCount > 0) {
            res.status(201).send("Organization added successfully.");
        } else {
            res.status(500).send("Failed to add organization.");
        }
    } catch (error) {
        console.error("Error adding organization:", error);
        res.status(500).send("An error occurred while adding the organization.");
    }
});

// Endpoint to fetch organizations
router.get("/organizations", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Organizations");

        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).send("No organizations found.");
        }
    } catch (error) {
        console.error("Error fetching organizations:", error);
        res.status(500).send("An error occurred while fetching organizations.");
    }
});
router.get("/organization-details/:org_id", async (req, res) => {
    const { org_id } = req.params;
  
    try {
        const result = await pool.query(
            `
            SELECT
              o.title AS organization_name,
              COUNT(uo.u_org_id) AS number_of_users,
              ARRAY_AGG(json_build_object('username', u.username, 'id', u.u_id, 'image_url', u.image_url, 'userId', u.user_id, 'email', u.email,'sub', u.sub,'password',u.password, 'role',u.role)) AS users
            FROM
              usr_org uo
              INNER JOIN organizations o ON uo.org_id = o.org_id
              INNER JOIN users u ON uo.u_id = u.u_id
            WHERE
              o.org_id = $1
            GROUP BY
              o.title
            `,
            [org_id]
        );
  
      if (result.rows.length === 0) {
        res.status(404).send("Organization not found.");
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (error) {
      console.error("Error fetching organization details:", error);
      res.status(500).send("An error occurred while fetching organization details.");
    }
  });

router.delete('/deleteUser/:orgId/user/:userId', async (req, res) => {
    const { orgId, userId } = req.params; // Extract parameters from the URL

    if (!orgId || !userId) {
        return res.status(400).json({ error: 'Missing organization ID or user ID' });
    }

    try {
        const result = await pool.query(
            `DELETE FROM usr_org WHERE org_id = $1 AND u_id = $2 RETURNING *`,
            [orgId, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found in the specified organization' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
 
 
 
router.get('/getTasks', async (req, res) => {
    try {

        const data = await pool.query("SELECT tasks.*, users.username FROM tasks INNER JOIN users ON tasks.u_id = users.u_id");
        res.json(data.rows).status(200);
    } catch (e) {
        res.json(e).status(500);
    }
})
router.get('/getTasks/:name', async (req, res) => {
    const name = req.params.name; // Extract the name parameter from the request

    try {
        // Use a parameterized query to prevent SQL injection
        const data = await pool.query("SELECT tasks.*, users.username FROM tasks INNER JOIN users ON tasks.u_id = users.u_id WHERE task_name = $1", [name]);
        
        res.json(data.rows).status(200);
    } catch (e) {
        console.error('Error fetching tasks:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getOrgTasks/:org_id', async (req, res) => {
    const org_id = req.params.org_id;

    try {
        const data = await pool.query(`
            SELECT tasks.*, users.username 
            FROM tasks 
            INNER JOIN users ON tasks.u_id = users.u_id
            WHERE tasks.org_id = $1
        `, [org_id]);

        res.json(data.rows).status(200);
    } catch (e) {
        res.json(e).status(500);
    }
});
router.post("/insertTask", async (req, res) => {
    const { task_name, task_desc, email, org_id } = req.body;

    try {
        const user = await pool.query(
            "SELECT u_id FROM users WHERE email = $1",
            [email]
        );
        
        if (user.rows.length === 0) {
            return res.status(404).send("User not found");
        }
        
        const insertTask = await pool.query(
            "INSERT INTO tasks (task_name, task_desc, u_id, org_id) VALUES ($1, $2, $3, $4)",
            [task_name, task_desc, user.rows[0].u_id, org_id]
        );

        res.status(200).send("Task inserted successfully");
    } catch (error) {
        console.error("Error inserting task:", error);
        res.status(500).send("Error inserting task: " + error.message);
    }
});





 
 
router.get('/getTasks', async (req, res) => {
    try {

        const data = await pool.query("SELECT tasks.*, users.username FROM tasks INNER JOIN users ON tasks.u_id = users.u_id");
        res.json(data.rows).status(200);
    } catch (e) {
        res.json(e).status(500);
    }
})
router.get('/getTasks/:name', async (req, res) => {
    const name = req.params.name; // Extract the name parameter from the request

    try {
        // Use a parameterized query to prevent SQL injection
        const data = await pool.query("SELECT tasks.*, users.username FROM tasks INNER JOIN users ON tasks.u_id = users.u_id WHERE task_name = $1", [name]);
        
        res.json(data.rows).status(200);
    } catch (e) {
        console.error('Error fetching tasks:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getOrgTasks/:org_id', async (req, res) => {
    const org_id = req.params.org_id;

    try {
        const data = await pool.query(`
            SELECT tasks.*, users.username 
            FROM tasks 
            INNER JOIN users ON tasks.u_id = users.u_id
            WHERE tasks.org_id = $1
        `, [org_id]);

        res.json(data.rows).status(200);
    } catch (e) {
        res.json(e).status(500);
    }
});
router.post("/insertTask", async (req, res) => {
    const { task_name, task_desc, email, org_id } = req.body;

    try {
        // Retrieve the user's u_id based on the email
        const user = await pool.query(
            "SELECT u_id FROM users WHERE email = $1",
            [email]
        );

        // Check if the user exists
        if (user.rows.length === 0) {
            return res.status(404).send("User not found");
        }

        // Insert the task with the retrieved u_id and org_id
        const insertTask = await pool.query(
            "INSERT INTO tasks (task_name, task_desc, u_id, org_id) VALUES ($1, $2, $3, $4)",
            [task_name, task_desc, user.rows[0].u_id, org_id]
        );

        res.status(200).send("Task inserted successfully");
    } catch (error) {
        console.error("Error inserting task:", error);
        res.status(500).send("Error inserting task: " + error.message);
    }
});
 
 
 
 module.exports = router;
