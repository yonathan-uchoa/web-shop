import mongoose from "mongoose";
import OrderSchema from "../schema/order-schema.js";

const Order = mongoose.model("order", OrderSchema);

Order.new = async (order) => {
  await new Order(order).save();

  return Order.findOne({ id: order.id }).select(
    "-_id -cart._id -__v -cart.__v -cart.products._id -cart.products.__v"
  );
};

export default Order;
