const mongoose = require("mongoose");

const callbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  status: { type: String, enum: ['pending', 'attending', 'attended'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model("Callback", callbackSchema);
