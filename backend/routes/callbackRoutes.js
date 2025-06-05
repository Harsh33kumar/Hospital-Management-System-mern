const express = require("express");
const router = express.Router();
const Callback = require("../models/callbackModel");

router.post("/", async (req, res) => {
  try {
    const { name, address, email, contactNumber } = req.body;

    const newCallback = new Callback({ name, address, email, contactNumber });
    await newCallback.save();

    res.status(201).json({ message: "Callback request saved" });
  } catch (error) {
    console.error("Error saving callback:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const allRequests = await Callback.find();
    res.json(allRequests);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch data" });
  }
});
// Update callback status by ID
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  if (!['pending', 'attending', 'attended'].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const updated = await Callback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Callback not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Callback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Callback deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete callback" });
  }
});

// ------------------------email-------------------------

const nodemailer = require('nodemailer');

// POST /api/callbacks/send-email
router.post('/send-email', async (req, res) => {
  const { name, email } = req.body;

  // Configure transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'harshveeru54@gmail.com',
      pass: 'dmei vhmf sgky xlzc ', // use App Password if using Gmail
    },
  });

  const mailOptions = {
    from: 'harshveeru54@gmailcom',
    to: email,
    subject: 'Callback Request Received',
    text: `Hello ${name},\n\nThank you for your request. We have received your details and will contact you soon.\n\nBest Regards,\nRAMH`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});


module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Callback = require("../models/callbackModel");
// const nodemailer = require("nodemailer");

// // Configure transporter (Use your email service credentials)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "yourgmail@gmail.com",         // Replace with your Gmail address
//     pass: "your-app-password",           // Use App Password, NOT your Gmail password
//   },
// });

// router.post("/", async (req, res) => {
//   try {
//     const { name, address, email, contactNumber } = req.body;

//     // Save data to DB
//     const newCallback = new Callback({ name, address, email, contactNumber });
//     await newCallback.save();

//     // Email content
//     const mailOptions = {
//       from: "yourgmail@gmail.com",
//       to: email,
//       subject: "Callback Request Received",
//       text: `Dear ${name},\n\nThank you for reaching out. We have received your request and will connect with you soon.\n\n- Healthcare Team`,
//     };

//     // Send email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Email sending error:", error);
//         return res.status(500).json({ error: "Failed to send email" });
//       } else {
//         console.log("Email sent: " + info.response);
//         return res.status(201).json({ message: "Callback request saved and email sent" });
//       }
//     });

//   } catch (error) {
//     console.error("Error saving callback:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;
