import { Schema } from "mongoose";

const counter = {
  id: String,
  seq: Number,
};

export default new Schema(counter);
