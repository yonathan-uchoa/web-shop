import mongoose from "mongoose";
import OrderSchema from "../schema/order-schema.js";

const Order = mongoose.model("order", OrderSchema);

Order.new = (id, cart, payment, total) => {
  new Order({
    id: id,
    cart: cart,
    payment: payment,
    total: total,
  }).save();

  return Order.findOne({ id: id }).select("-_id -cart._id -__v");
};

export default Order;
