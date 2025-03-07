const mongoose = require("mongoose");

const schema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

const Conversation = mongoose.model("Conversation", schema); // Use PascalCase for models
module.exports = { Conversation }; // Corrected export