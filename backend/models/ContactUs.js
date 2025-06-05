const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  feedbackType: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  hospital: { type: String, required: true },
  comments: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);
