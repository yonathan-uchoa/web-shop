import Cart from "../model/cart.js";

class CartService {
  static async cartFlush() {
    const response = await Cart.cartFlush();
    return response;
  }
}

export default CartService;
