// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve all static files inside "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Fallback: serve index.html when visiting root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log('🚀 Server running at http://localhost:${PORT}');
});
