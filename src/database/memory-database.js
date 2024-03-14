import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import database from "./data.json" assert { type: "json" };
import Product from "../model/product.js";

const mongoServer = await MongoMemoryServer.create();

export const dbConnect = async () => {
  const uri = await mongoServer.getUri();
  process.env.DATABASE_URL = uri;
  (async function () {
    await Promise.all(
      database.map(async (element) => {
        await new Product(element).save();
      })
    );
  })();

  await mongoose.connect(uri);
};

export const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};
