import { Schema } from "mongoose";

const product = {
  id: { type: Number, unique: true },
  title: String,
  price: Number,
  description: { type: String, default: "no description" },
  category: String,
  quantity: Number,
  image: { type: String, default: "https://placehold.co/200x300" },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
};

export default new Schema(product, { versionKey: false });
