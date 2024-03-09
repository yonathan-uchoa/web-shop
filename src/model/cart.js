import mongoose from "mongoose";
import CartSchema from "../schema/cart-schema.js";

const Cart = mongoose.model("cart", CartSchema);

Cart.updateProduct = async (product) => {
  return Cart.findOneAndUpdate(
    { id: "mycart", "products.id": product.id },
    {
      $set: {
        "products.$.quantity": product.quantity,
      },
    },
    { new: true }
  ).select("-_id -products._id -__v");
};

Cart.new = async (products = []) => {
  new Cart({ id: "mycart", products: products }).save();

  return Cart.findOne({ id: "mycart" }).select("-_id -products._id -__v");
};

Cart.updateCart = (products) => {
  return Cart.findOneAndUpdate(
    { id: "mycart" },
    { products: products },
    { new: true }
  )
    .select("-_id -products._id -__v")
    .then((data) => (data ? data : Cart.new(products)));
};

export default Cart;
