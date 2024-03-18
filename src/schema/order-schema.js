import { Schema } from "mongoose";
import cartSchema from "./cart-schema.js";

const order = {
  id: {
    type: Number,
    unique: true,
  },
  cart: cartSchema,
  total: Number,
  payment: String,
  createAt: { type: Date, default: new Date().toLocaleString("en-US") },
};

export default new Schema(order);
