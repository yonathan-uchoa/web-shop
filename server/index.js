require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productsRouter = require("./routes/products");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/products", productsRouter);

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
