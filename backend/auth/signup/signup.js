const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const mail = require("../../config/mail.js");
const db = require("../../config/db.js");
require("dotenv").config()
const router = express.Router();
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example : Samuel Asmare
 *               email:
 *                 type: string
 *                 example : samuel.asmare@a2sv.org
 *               password:
 *                 type: string
 *                 example : myAfalgugnPassword
 *     responses:
 *       201:
 *         description: Successfully registered and email sent
 *       400:
 *         description: User already exists
 *       500:
 *         description: Registration error
 */

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const base_url = process.env.BACKEND_URL
  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (fullname, email, password_hash) VALUES (?, ?, ?)",
     [name, email, hashedPassword]);
    const verificationToken = jwt.sign({ email },process.env.JWT_SECRET,{ expiresIn: "1m" }  );
    const verificationLink = `${base_url}/auth/verify-email?token=${verificationToken}`;
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin: auto;
        padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333;">Verify Your Email</h2><p style="font-size: 16px;
         color: #555;">Hello ${name},<br><br>Thank you for signing up! Please verify your 
          email by clicking the button below:</p><a href="${verificationLink}"
           style="display:inline-block; padding: 12px 24px; background-color: 
        #1a73e8; color: white; text-decoration: none; border-radius: 5px;
         font-weight: bold;">Verify Email</a><p style="font-size: 14px; color:
          #999; margin-top: 20px;">If you did not create an account, please ignore this email.</p></div>`;
      await mail({to: email,subject: "Verify your email",html:emailHTML});
      return res.status(201).json({ message: "✅ Successfully registered and email sent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Registration error" });
  }
  
});


module.exports = router;
