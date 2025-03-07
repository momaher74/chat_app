const { Order } = require("../models/order.js");
const { getSocketInstance } = require("../socket"); // Import function to get io

module.exports.createOrder = async (req, res) => {
  try {
    const io = getSocketInstance(); // Get socket instance
    const { order } = req.body; 

    // Create a new order
    const newOrder = new Order({ order });
    await newOrder.save();

    // Emit order event to clients
    io.emit("orders", { order: newOrder.order, date: newOrder.createdAt });

    // Respond with a single response
    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder
    });

  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
