import dotenv from "dotenv";
// server
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import specs from "./src/config/swagger-conf.js";
// database
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { dbConnect as database } from "./src/database/database.js";
import { dbConnect as memoryDatabase } from "./src/database/memory-database.js";
// routes
import ProductsRouter from "./src/routes/products.js";
import CartRouter from "./src/routes/cart.js";
import OrderRouter from "./src/routes/order.js";

import Counter from "./src/model/counter.js";

/** -------- dotenv configuration -------- */
dotenv.config();

/** -------- database connection -------- */
const isTestEnvironment = process.env.NODE_ENV === "test" ? true : false;
isTestEnvironment ? await memoryDatabase() : await memoryDatabase();

/** -------- server configuration -------- */
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());

app.use("/products", ProductsRouter);
app.use("/cart", CartRouter);
app.use("/order", OrderRouter);

app.get("/counter", (req, res) => {
  Counter.find({}).then((data) => res.send(data));
});

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.closeServer = () => {
  server.close();
};

export default app;
