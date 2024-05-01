
require('dotenv').config();
const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
};
module.exports = { corsConfig };
