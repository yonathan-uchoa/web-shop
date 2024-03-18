import { Schema } from "mongoose";

const product = {
  id: { type: Number, unique: true },
  title: String,
  price: Number,
  description: String,
  category: String,
  quantity: Number,
  image: String,
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
};

export default new Schema(product, { versionKey: false });
