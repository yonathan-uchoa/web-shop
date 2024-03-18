import { object, number, array, string } from "yup";
import { genericError } from "../utils/error-handle.js";
import { ProductValidationSchema } from "./product-validation.js";

const PUT_CART_PRODUCT = object({
  id: number().min(0).integer().required(),
  quantity: number()
    .min(1, "min quantity is 1")
    .max(9, "max quantity is 9")
    .integer()
    .required(),
});

const CART_PRODUCTS = ProductValidationSchema.concat(
  object({
    quantity: number().min(1).max(9).integer().required(),
  })
);

export const CartValidationSchema = object({
  products: array().of(CART_PRODUCTS),
  id: string().required(),
});

export class CartValidation {
  static async addProduct(id, quantity) {
    return PUT_CART_PRODUCT.validate({ id: id, quantity: quantity }).catch(
      (err) => genericError(400, err.message, err.errors)
    );
  }
}
