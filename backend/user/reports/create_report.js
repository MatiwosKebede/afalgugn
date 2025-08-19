const express = require("express");
const multer = require("multer");
const cloudinary = require("../../config/cloudinary");
const db = require("../../config/db"); 
const fs = require("fs");
const router = express.Router();
const authenticate = require('../../utils/middleware/authenticate')
const upload = multer({ dest: "uploads/" });

router.post("/report-missing",authenticate, upload.single("image"), async (req, res) => {
  try {
    const { name, age, gender, contact_info, date_missing, user_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "missing_persons",
    });

  
    try {
      fs.unlinkSync(req.file.path);
    } catch (err) {
      console.warn("Could not delete local file:", err.message);
    }

   
    const query = `
      INSERT INTO report 
      (person_fullname, age, gender, contact_info, date_missing, image, user_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      name,
      age,
      gender,
      contact_info,
      date_missing,
      result.secure_url,
      user_id,
    ];

    await db.query(query, values); 

    res.json({
      message: "Report saved successfully",
      image_url: result.secure_url,
    });

  } catch (err) {
    console.error("Error:", err.message || err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  }
});

module.exports = router;
