import { Schema } from "mongoose";
import ProductSchema from "./product-schema.js";

const cart = {
  id: String,
  products: [ProductSchema],
};

export default new Schema(cart);
