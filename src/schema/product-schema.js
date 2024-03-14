import { Schema } from "mongoose";

const product = {
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  quantity: Number,
  image: String,
  rating: { rate: Number, count: Number },
};

export default new Schema(product, { versionKey: false });
