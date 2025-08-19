const jwt = require("jsonwebtoken");
const db = require("../../config/db")
const bcrypt = require("bcrypt")
const router = require("express").Router()
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Sign in to your account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mySecurePassword123
 *     responses:
 *       200:
 *         description: Login successful, returns access and refresh tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged in successfully
 *                 access_token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refresh_token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: User not found
 *       401:
 *         description: Wrong password
 *       500:
 *         description: Internal server error
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length < 1) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const access_token = jwt.sign(
      { id: user[0].user_id, email: user[0].email },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" }
    );
    const refresh_token = jwt.sign(
      { id: user[0].user_id, email: user[0].email },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("refreshToken", refresh_token, {  
      httpOnly: true,
      secure: true,       
      sameSite: "Strict", 
      maxAge: 7*24*60*60*1000 
    });
      await db.query(
      `INSERT INTO tokens (user_id, refresh_token) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE refresh_token = ?`,
       [user[0].user_id, refresh_token, refresh_token]
        );
    return res.status(200).json({
      message: "Logged in successfully",
      access_token,
      refresh_token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unknown error, please try again" });
  }
});

module.exports = router