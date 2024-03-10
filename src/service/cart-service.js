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
}

export default CartService;
