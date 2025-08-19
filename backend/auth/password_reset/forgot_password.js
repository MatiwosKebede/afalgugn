const  router = require('express').Router()
const mail = require('../../config/mail')
const jwt = require("jsonwebtoken");
const db = require("../../config/db")
require('dotenv').config()

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const [user] = await db.query("SELECT * FROM users WHERE email=?", [email]);

  if (!user.length) return res.status(400).json({ message: "User not found" });

  const resetToken = jwt.sign(
    { id: user[0].user_id },
    process.env.RESET_PASSWORD_SECRET,
    { expiresIn: "1h" }
  );
  const base_url = process.env.BACKEND_URL
  const client_url = process.env.CLIENT_URL
  const resetLink = `${client_url}/reset-password?token=${resetToken}`;
  const emailHTML = `
   <div style="font-family: Arial, sans-serif; max-width: 
       600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="color: #333;">Reset your password</h2>
    <p style="font-size: 16px; color: #555;">
      Hello ,<br><br>
      welcome back! Please reset your password
      by clicking the button below:
    </p>
    <a href="${resetLink}" style="display:
     inline-block; padding: 12px 24px; background-color: 
     #1a73e8; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
      Reset password
    </a>
      <p style="font-size: 14px; color: #999; margin-top: 20px;">
        If you did not create an account, please ignore this email.
      </p>
  </div>`;
  await mail({
      to: email,
      subject: "Reset password",
      html:  emailHTML  });

  res.json({ message: "Password reset link sent to your email" });
});

module.exports = router