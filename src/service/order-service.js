import Order from "../model/order.js";
import Counter from "../model/counter.js";
import CartService from "./cart-service.js";

class OrderService {
  static async generateOrder(paymentMethod) {
    // verify if cart exist or cart.products is not empty
    const _cart = await CartService.isNotEmpty();
    if (!_cart) {
      throw { message: "cart is empty!", status: 400 };
    }
    // get id counter
    const _id = await Counter.updateSeq();
    // reduce all products values
    const _total = _cart.products.reduce(
      (accumulator, value) => accumulator + value.price * value.quantity,
      0
    );
    // empty cart
    await CartService.cartFlush();

    return Order.new(_id, _cart, paymentMethod, _total);
  }
}

export default OrderService;
