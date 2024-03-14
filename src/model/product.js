import mongoose from "mongoose";
import productSchema from "../schema/product-schema.js";

const Product = mongoose.model("product", productSchema);

Product.findByFilter = (limit, sort, title, attributeName, attributeValue) => {
  const regex = new RegExp(`^${title}`, "i");
  return Product.find(
    { [attributeName]: attributeValue, title: regex },
    { _id: 0 }
  )
    .sort({ id: sort })
    .limit(limit)
    .exec();
};

Product.findCategories = () => {
  return Product.find().sort({ category: 1 }).distinct("category");
};

export default Product;
