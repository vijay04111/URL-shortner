const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },

  redirectURL: {
    type: String,
    required: true,
  },

  visitHistory: [{ timestamp: Number }],

  // 👇 IMPORTANT FIELD
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // User model ka reference
    required: true
  }
});

module.exports = mongoose.model('URL', urlSchema);
