const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const organizationRouter = require('./routes/organization');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/organization', organizationRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
