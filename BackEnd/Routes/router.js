const express = require('express');
const router = express.Router();

// Add middleware to parse JSON bodies
router.use(express.json());

router.post('/sign-up', (req, res) => {
    const { username, email, password } = req.body;
    
    console.log(username + " | " + email + " | " + password);

    res.send('Received');
});

module.exports = router;
