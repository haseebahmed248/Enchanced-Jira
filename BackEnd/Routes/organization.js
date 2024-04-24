const express = require("express");
const pool = require("../DataBase/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const cors = require("cors");

// Configure multer storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save uploaded files to the "uploads" directory
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Use the original filename, adding a timestamp to ensure uniqueness
    const timestamp = Date.now();
    const originalName = file.originalname;
    const newFilename = `${timestamp}_${originalName}`;
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

router.use(express.json()); // Middleware to parse JSON bodies

// Image upload endpoint
router.post("/upload", upload.single("image"), (req, res) => {
  if (req.file) {
    // Respond with the URL of the uploaded image
    res.status(200).json({ url: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).send("Image upload failed");
  }
});

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




module.exports = router;
