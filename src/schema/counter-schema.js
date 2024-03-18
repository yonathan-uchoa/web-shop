import { Schema } from "mongoose";

const counter = {
  id: String,
  order: { type: Number, default: 0 },
  product: { type: Number, default: 0 },
};

export default new Schema(counter);
