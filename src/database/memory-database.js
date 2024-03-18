import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { data } from "./data.js";
import { ProductService } from "../service/product-service.js";

const mongoServer = await MongoMemoryServer.create();

export const dbConnect = async () => {
  const uri = await mongoServer.getUri();
  process.env.DATABASE_URL = uri;
  await mongoose.connect(uri);

  for (let i = 0; i < data.length; i++) {
    await ProductService.save(data[i]).catch(() =>
      console.log("err: " + data[i].id)
    );
  }
};

export const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};
