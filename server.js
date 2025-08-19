// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT =  3000;

// Serve all static files inside "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Fallback: serve index.html when visiting root
app.get("/afal", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000,'0.0.0.0', () => {
  console.log('🚀 Server running at http://localhost:${PORT}');
});
