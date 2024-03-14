import mongoose from "mongoose";
import Product from "../model/product.js";
import { data } from "./data.js";

// Connect to MongoDB
export const dbConnect = async () => {
  const uri = process.env.DATABASE_URL;
  const database = JSON.parse(file);
  (async function () {
    await Promise.all(
      database.map(async (element) => {
        await new Product(element).save();
      })
    );
  })();

  await mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
