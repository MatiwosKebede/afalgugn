const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require("../../config/db")
require("dotenv").config()
router.post("/reset-password", async (req, res) => {
  const {newPassword } = req.body;
  const token = req.query.resetToken;
  if (!token || !newPassword) return res.status(400).json({ message: "Missing data" });
  console.log("Token:", token);
  console.log("Secret:", process.env.RESET_PASSWORD_SECRET);
  console.log(newPassword)
  try {
    const payload = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query(
      "update users set password_hash=? where user_id=?",[hashedPassword, payload.id]
    );
    res.json({ message: "Password reset successfully" });
  } catch (err) {
  console.log(err);
  return res.status(400).json({ 
    message: "Invalid or expired token", 
    error: err.message 
  });
}
});

module.exports = router