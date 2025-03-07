const mongoose = require("mongoose");

const schema = mongoose.Schema({
  message: String,
  senderId: String,
  receiverId: String,
  conversationId: String,
});

const message = mongoose.model("message", schema);
module.exports =  message;
