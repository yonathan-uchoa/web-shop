import { object, string, number } from "yup";
import { genericError } from "../utils/error-handle.js";

export const ProductValidationSchema = object({
  id: number(),
  title: string().max(255).required(),
  price: number().positive().moreThan(0).required(),
  description: string(),
  category: string().max(100).required(),
  image: string(),
  rating: object({ rate: number().positive(), count: number().positive() }),
});

const PATCH_PRODUCT = object({
  title: string().max(255),
  price: number().positive().moreThan(0),
  description: string(),
  category: string(),
  image: string(),
  rating: object({ rate: number(), count: number() }),
});
export class ProductValidation {
  static validate(product) {
    return ProductValidationSchema.validate(product).catch((err) =>
      genericError(400, err.message, err.errors)
    );
  }
  static patch(product) {
    return PATCH_PRODUCT.validate(product).catch((err) =>
      genericError(400, err.message, err.errors)
    );
  }
}
