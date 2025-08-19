const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const jwt = require("jsonwebtoken");
const mail = require("../../config/mail");
const path = require("path")
require("dotenv").config()
router.get("/resend-email", async (req, res) => {
  const base_url = process.env.BACKEND_URL
  const email = req.query.email;
  if (!email) return res.status(400).send("Email not provided");
  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!users.length) return res.status(404).send("User not found");

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1m" });
    const verificationLink = `${base_url}/auth/verify-email?token=${token}`;
    const emailHTML = `<div style="font-family: Arial, sans-serif; max-width:600px;
     margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="color: #333;">Verify Your Email</h2><p style="font-size: 16px; color:
     #555;">Hello ,<br><br>Thank you for signing up! Please verify your email by clicking
      the button below:</p><a href="${verificationLink}" style="display:
     inline-block; padding: 12px 24px; background-color:#1a73e8; color: white; text-decoration:
      none; border-radius: 5px; font-weight: bold;">  Verify Email</a>
      <p style="font-size: 14px; color: #999; margin-top: 20px;">
        If you did not create an account, please ignore this email.
      </p> </div>`;
    await mail({
      to: email,subject: "Resend Verification Email",
      html:  emailHTML  });
    res.sendFile(path.resolve(__dirname,"../../views/resent_successfull.html"));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending email");
  }
});

module.exports = router;
