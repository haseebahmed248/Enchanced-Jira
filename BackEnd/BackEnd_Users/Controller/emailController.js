const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendLoginEmail = expressAsyncHandler(async (email) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Login Notification",
    text: `Hello! You have successfully logged in.`,
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Login notification email sent successfully.");
    }
  });
});

module.exports = { sendLoginEmail }; 