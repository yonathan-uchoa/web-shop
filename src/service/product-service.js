import Counter from "../model/counter.js";
import Product from "../model/product.js";
import { genericError } from "../utils/error-handle.js";
import { ProductValidation } from "../validation/product-validation.js";

export class ProductService {
  /**
   * Product finder, return a Promise
   * @param {number} [limit=null] - number of products
   * @param {string} [sort='asc'] - sort asc or desc
   * @param {string} [title=''] -  filter by beginning of title
   * @param {string} [category=null] - name of the category
   * @returns {string[]} Array of products
   */
  static async findProduct(
    limit = null,
    sort = "asc",
    title = "",
    category = null
  ) {
    return Product.findByFilter(limit, sort, title, category);
  }

  static async findCategories() {
    return Product.findCategories();
  }

  static async save(prod) {
    await ProductValidation.validate(prod);
    const { product: _id } = await Counter.updateSeq("product");
    prod.id = _id;
    const _product = await new Product(prod);
    return _product.save();
  }

  static async findById(id) {
    return Product.findOne({ id: id }, "-_id -__v")
      .lean()
      .then((data) =>
        data ? data : genericError(404, `product id: ${id} not found!`)
      );
  }

  static async update(idProduct, product) {
    await ProductValidation.patch(product);
    return Product.findOneAndUpdate(
      { id: idProduct },
      { $set: product },
      { new: true }
    )
      .select("-_id -__v")
      .lean()
      .then((data) =>
        data ? data : genericError(404, `product id: ${idProduct}, not found!`)
      );
  }
}
