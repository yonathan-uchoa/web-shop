import Product from "../model/product.js";

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
}
