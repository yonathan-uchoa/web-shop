import mongoose from "mongoose";

// Connect to MongoDB
export const dbConnect = async () => {
  const uri = process.env.DATABASE_URI;
  await mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
