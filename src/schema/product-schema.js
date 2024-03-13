import { Schema } from "mongoose";

const product = {
  id: Number,
  price: Number,
  category: String,
  title: String,
  quantity: Number,
  image: String,
};

export default new Schema(product, { _id: false });
