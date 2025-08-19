const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,           
  secure: true,        
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

const sendMail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `"Afalgugn" <${process.env.EMAIL_USER}>`, 
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
