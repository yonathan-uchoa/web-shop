import { object, string, number } from "yup";

export const ProductValidationSchema = object({
  id: number(),
  title: string().max(255).required(),
  price: number().positive().moreThan(0).required(),
  description: string(),
  category: string().required(),
  image: string(),
  rating: object({ rate: number(), count: number() }),
});
export class ProductValidation {
  static validate(product) {
    return ProductValidationSchema.validate(product).catch((err) =>
      genericError(400, err.message, err.errors)
    );
  }
}
