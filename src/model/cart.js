import mongoose from "mongoose";
import CartSchema from "../schema/cart-schema.js";

const Cart = mongoose.model("cart", CartSchema);

Cart.updateProduct = async (idProduct, quantity) => {
  return Cart.findOneAndUpdate(
    { id: "mycart", "products.id": idProduct },
    {
      $set: {
        "products.$.quantity": quantity,
      },
    },
    { new: true }
  ).select("-_id -products._id -__v");
};

Cart.new = async (products = []) => {
  await new Cart({ id: "mycart", products: products }).save();

  return Cart.findOne({ id: "mycart" }).select("-_id -__v");
};

Cart.updateCart = (products) => {
  return Cart.findOneAndUpdate(
    { id: "mycart" },
    { $push: { products: products } },
    { new: true }
  )
    .select("-_id -products._id -__v")
    .then((data) => (data ? data : Cart.new(products)));
};

Cart.cartFlush = () => {
  return Cart.findOneAndUpdate(
    { id: "mycart" },
    { products: [] },
    { new: true }
  );
};

export default Cart;
