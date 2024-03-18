import { object, string, number, date } from "yup";
import { CartValidationSchema } from "./cart-validation.js";
import { genericError } from "../utils/error-handle.js";

export const OrderValidationSchema = object({
  cart: CartValidationSchema,
  total: number().positive().moreThan(0).required(),
  payment: string().oneOf(["billet", "credit", "pix"]).required(),
});

export class OrderValidation {
  static async validate(order) {
    return OrderValidationSchema.validate(order).catch((err) =>
      genericError(400, err.message, err.errors)
    );
  }
}
