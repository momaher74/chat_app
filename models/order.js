const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    order: String,
  },
  { timestamps: true } // This automatically adds `createdAt` and `updatedAt`
);
const Order = mongoose.model("Order", schema); // Use PascalCase for models
module.exports = { Order }; // Corrected export