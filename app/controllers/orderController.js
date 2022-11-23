const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const { io } = require("../../app");

exports.listOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
};

exports.createProfil = async (req, res, next) => {
  try {
    const order = new Order(req.body);

    await order.save();
    const orders = await Order.find();
    io.emit("order-added", orders);
    console.log(io.emit("order-added", orders));
    res.status(201).send(order);
  } catch (error) {
    res.send(error);
  }
};
