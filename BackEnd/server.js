
// const bodyParser = require('body-parser');
// const express = require('express')
// const cors = require('cors')
// const users = require('./Routes/users')
// const organization = require('./Routes/organization')
// const admin = require('./Routes/admin')
// const dotenv = require('dotenv')
// dotenv.config()


// const PORT = process.env.PORT;

// const app = express();

// app.use(cors({
//     origin:'*'
// }))
// const session = require('express-session');


// app.use(session({
//     secret: process.env.SECRET, 
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         secure: "auto", 
//         sameSite: "lax"
//     }
// }));

// app.use(bodyParser.json())
// app.use('/users',users);
// app.use('/organization',organization)
// app.use('/admin',admin)

// app.listen(PORT,()=>{
//     console.log(`Servier is Listening to Port ${PORT}`);
// })


// server.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const path = require('path');
// const dotenv = require('dotenv');
// const users = require('./Routes/users');
// const organization = require('./Routes/organization');
// const admin = require('./Routes/admin');
// const upload = require('./Routes/upload'); // New route for file uploads

// dotenv.config();

// const PORT = process.env.PORT;

// const app = express();

// // CORS configuration
// app.use(cors({
//     origin: '*',
// }));

// // Session configuration
// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         secure: 'auto',
//         sameSite: 'lax',
//     },
// }));

// // Body parser
// app.use(bodyParser.json());

// // Serve static files (uploads)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serves uploaded files

// // Route configuration
// app.use('/users', users);
// app.use('/organization', organization);
// app.use('/admin', admin);
// app.use('/upload', upload); // Endpoint for image uploads

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });

// // server.js
// const express = require("express");
// const cors = require("cors");
// const session = require("express-session");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const path = require("path");

// const users = require("./Routes/users");
// const organization = require("./Routes/organization");
// const upload = require("./Routes/upload"); // Route for image uploads

// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: '*', // Allow all origins (adjust as needed for security)
// }));

// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     httpOnly: true,
//     secure: "auto",
//     sameSite: "lax",
//   },
// }));

// app.use(bodyParser.json());

// // Serve static files (uploaded images)
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Path to serve uploaded files

// // Route configuration
// app.use("/users", users);
// app.use("/organization", organization);
// app.use("/upload", upload); // Endpoint to upload images

// const PORT = process.env.PORT ;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });



// // server.js
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

const users = require("./Routes/users");
const organization = require("./Routes/organization");
const upload = require("./Routes/upload"); // Route for image uploads
const admin = require("./Routes/admin")

dotenv.config();

const app = express();

app.use(cors({
  origin: '*', // Allow all origins (adjust as needed for security)
}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: "auto",
    sameSite: "lax",
  },
}));

app.use(bodyParser.json());

// Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Path to serve uploaded files

// Route configuration
app.use("/users", users);
app.use("/organization", organization);
app.use("/admin",admin)
app.use("/upload", upload); // Endpoint to upload images

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
