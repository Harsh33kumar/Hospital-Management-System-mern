const express = require("express");
const router = express.Router();
const Contact = require("../models/ContactUs");

// POST /contact
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully." });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});
// server.js or routes/contact.js
router.get('/count', async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch count" });
  }
});

module.exports = router;
