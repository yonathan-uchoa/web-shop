import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = await MongoMemoryServer.create();

export const dbConnect = async () => {
  const uri = await mongoServer.getUri();

  await mongoose.connect(uri);
};

export const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};
