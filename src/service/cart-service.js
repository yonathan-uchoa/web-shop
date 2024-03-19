import Cart from "../model/cart.js";
import { genericError } from "../utils/error-handle.js";
import { CartValidation } from "../validation/cart-validation.js";
import { ProductService } from "./product-service.js";

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
          genericError(428, "cart must have at least one product!");
        }
        return data;
      });
  }

  static async productOnCart(idProduct) {
    return Cart.findOne({ id: "mycart", "products.id": idProduct }).then(
      (data) => (data ? genericError(400, "product already on cart!") : false)
    );
  }

  static async cascadeUpdateProduct(product) {
    return Cart.findOneAndUpdate(
      { "products.id": product.id },
      { $set: { "products.$": product } }
    );
  }

  static async deleteProduct(idProduct) {
    return Cart.findOneAndUpdate(
      { id: "mycart" },
      { $pull: { products: { id: idProduct } } },
      { new: true }
    )
      .select("-_id -__v")
      .then((data) => {
        if (data) return data;
        throw genericError(404, "product not found!");
      });
  }

  static async addProduct(idProduct, quantity) {
    await CartValidation.addProduct(idProduct, quantity);
    await CartService.productOnCart(idProduct);
    const _product = await ProductService.findById(idProduct);
    _product.quantity = quantity;
    return Cart.updateCart(_product);
  }

  static async updateProduct(idProduct, quantity) {
    await CartValidation.addProduct(idProduct, quantity);
    return Cart.updateProduct(idProduct, quantity).then((data) =>
      data ? data : genericError(404, `product id: ${idProduct}, not found!`)
    );
  }
}

export default CartService;
