const express = require('express');
const pool = require('../DataBase/db')
const router = express.Router();

// Add middleware to parse JSON bodies
router.use(express.json());

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


module.exports = router;
