import Cart from "../model/cart.js";

class CartService {
  static async cartFlush() {
    const response = await Cart.cartFlush();
    return response;
  }

  static async isNotEmpty() {
    return Cart.findOne({ id: "mycart" })
      .lean()
      .then((data) => {
        if (data == null || data.products.length == 0) {
          return false;
        }
        return data;
      });
  }

  static async deleteProduct(idProduct) {
    return Cart.findOneAndUpdate(
      { id: "mycart" },
      { $pull: { products: { id: idProduct } } },
      { new: true }
    ).select("-_id -__v");
  }
}

export default CartService;
