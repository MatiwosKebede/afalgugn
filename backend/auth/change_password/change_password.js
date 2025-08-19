const bcrypt = require('bcryptjs')
const db = require('../../config/db')
const router = require("express").Router()
const authenticate  = require('../../utils/middleware/authenticate')
router.post("/change-password", authenticate, async (req, res) => {
    try {
        const { password } = req.body;
        const id = req.user.id;

        const [user] = await db.query('SELECT verified FROM users WHERE user_id = ?', [id]);

        if (!user || !user.verified) {
            return res.status(400).json({ message: "Account is not verified" });
        }

        const hashed_password = await bcrypt.hash(password, 10);

        await db.query('UPDATE users SET password_hash = ? WHERE user_id = ?', [hashed_password, id]);

        return res.status(200).json({ message: "Password changed successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Cannot update the password", err });
    }
});

module.exports = router