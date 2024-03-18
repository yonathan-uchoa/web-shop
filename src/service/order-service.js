import Order from "../model/order.js";
import Counter from "../model/counter.js";
import CartService from "./cart-service.js";
import { OrderValidation } from "../validation/order-validation.js";

class OrderService {
  /**
   * @param {string} paymentMethod
   * @returns
   */
  static async generateOrder(paymentMethod) {
    const cart = await CartService.isNotEmpty();
    // reduce all products values, to generate total value
    const total = cart.products.reduce(
      (accumulator, value) => accumulator + value.price * value.quantity,
      0
    );

    const _order = { payment: paymentMethod.toLowerCase(), cart, total };
    await OrderValidation.validate(_order);

    // get id counter
    const { order: _id } = await Counter.updateSeq("order");
    _order.id = _id;

    // empty cart
    await CartService.cartFlush();

    return Order.new(_order);
  }
}

export default OrderService;
