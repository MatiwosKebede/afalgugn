const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const jwt = require("jsonwebtoken"); 
const path = require("path")    
router.get("/verify-email", async (req, res) => {
  const token = req.query.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    await db.query('update users set verified=? where email = ?',[true , email])
    res.sendFile(path.resolve(__dirname, "../../views/already_verified.html"));
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const decoded = jwt.decode(token);
      const email = decoded?.email || "";
      res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Token Expired</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 flex items-center justify-center h-screen">
          <div class="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">
            <h1 class="text-3xl font-bold text-red-300 mb-4">Token Expired</h1>
            <p class="text-gray-600">Click the following link to get new verification email</p>
            <a href="/auth/resend-email?email=${email}" 
               class="mt-6 inline-block bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-green-700 transition">
              Get new email
            </a>
          </div>
        </body>
        </html>
      `);
    } else {
      res.status(400).send(`<h2 style="color:red">Invalid token</h2>`);
    }
  }
});


module.exports = router;
