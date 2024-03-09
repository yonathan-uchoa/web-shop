import Order from "../model/order.js";
import Counter from "../model/counter.js";
import Cart from "../model/cart.js";

class OrderService {
  static async generateOrder(paymentMethod) {
    const _id = await Counter.updateSeq();
    console.log("id " + _id);
    const _cart = await Cart.findOne({ id: "mycart" });
    if (_cart) {
      const _total = _cart.products.reduce(
        (accumulator, value) => accumulator + value.price * value.quantity,
        0
      );

      return Order.new(_id, _cart, paymentMethod, _total);
    } else {
      throw { message: "cart is empty!", status: 404 };
    }
  }
}

export default OrderService;
