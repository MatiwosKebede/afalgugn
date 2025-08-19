const router = require('express').Router();
const db = require('../config/db');

router.get('/posts', async (req, res) => {
  try {
    const [posts] = await db.query("SELECT * FROM post limit 10");
    res.status(200).json(posts); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" }); 
  }
});

module.exports = router;
