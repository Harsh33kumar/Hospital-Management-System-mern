const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  // testsIncluded: {
  //   type: String, // or Array if you want to split later
  //   required: true
  // },
  testsIncluded: {
  type: [String],
  required: true
},

  description: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
